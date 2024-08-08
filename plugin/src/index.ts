import type { PluginObj, NodePath } from '@babel/core';
import type { ImportDeclaration, CallExpression } from '@babel/types';
import { getFilePath } from './google/utils/get-file-path';
import { getImportedFontNames } from './google/watcher/get-imported-font-names';
import { getFontUsages } from './google/watcher/get-font-usages';
import createFontOptionsFile from './google/watcher/font-options';
import fontProcessor from './google/downloader';

export default function (): PluginObj {
  let filePath = '';

  let importedFonts: string[] = [];
  let fontUsages: any = {};

  return {
    visitor: {
      Program(_, state) {
        filePath = getFilePath(state);
      },
      ImportDeclaration(nodePath: NodePath<ImportDeclaration>) {
        getImportedFontNames(nodePath, (font) => importedFonts.push(font));
      },
      CallExpression: {
        enter(nodePath: NodePath<CallExpression>) {
          getFontUsages(nodePath, { fontUsages, importedFonts });
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
    },
  };
}
