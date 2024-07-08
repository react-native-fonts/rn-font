import type { PluginObj, NodePath } from '@babel/core';
import type { ImportDeclaration, CallExpression } from '@babel/types';
import createFontOptionsFile from './font-options';
import { getCompPath } from './get-comp-path';
import { getImportedFontNames } from './get-imported-font-names';
import { getFontUsages } from './get-font-usages';
import fontProcessor from './font-download';

export default function (): PluginObj {
  const importedFonts: string[] = [];
  let fontUsages: any = {};
  let filePath: string = '';

  return {
    visitor: {
      Program(_, state) {
        getCompPath({
          state,
          getComponentPath: (compPath) => {
            filePath = compPath;
          },
        });
      },
      ImportDeclaration(nodePath: NodePath<ImportDeclaration>) {
        getImportedFontNames(nodePath, (font) => importedFonts.push(font));
      },
      CallExpression: {
        enter(nodePath: NodePath<CallExpression>) {
          getFontUsages(nodePath, { fontUsages, importedFonts });
          console.log('fontUsages', fontUsages);
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
