import type { PluginObj, NodePath } from '@babel/core';
import type { ImportDeclaration, CallExpression } from '@babel/types';
import createFontOptionsFile from './font-options';
import { getCompName } from './get-comp-name';
import { getImportedFontNames } from './get-imported-font-names';
import { getFontUsages } from './get-font-usages';
import fontProcessor from './font-download';
import { getFontSource } from './custom-font';

export default function (): PluginObj {
  const importedFonts: string[] = [];
  let fontUsages: any = {};
  let filePath: string = '';

  return {
    visitor: {
      Program(_, state) {
        getCompName(state, (compPath) => (filePath = compPath));
      },
      ImportDeclaration(nodePath: NodePath<ImportDeclaration>) {
        getImportedFontNames(nodePath, (font) => importedFonts.push(font));
      },
      CallExpression: {
        enter(nodePath: NodePath<CallExpression>) {
          getFontUsages(nodePath, { fontUsages, importedFonts });
          getFontSource(nodePath);
        },
      },
    },
    post() {
      try {
        createFontOptionsFile(filePath, fontUsages);
        fontProcessor();
      } catch (err) {
        console.error(err);
      }

      fontUsages = {};
    },
  };
}
