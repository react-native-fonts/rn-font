import type { NodePath } from '@babel/core';
import type { ImportDeclaration } from '@babel/types';
import path from 'path';
import { isLibraryExample } from './isLibraryExample';
import { prepareFont } from './custom-font';

export const getImportedFontNames = (
  nodePath: NodePath<ImportDeclaration>,
  onNewImportedFont: (font: string) => void
) => {
  const sourceValue = nodePath.node.source.value;

  const isReactNativeFonts =
    sourceValue ===
    (isLibraryExample
      ? path.join(__dirname, '../../src/index')
      : 'react-native-simple-fonts');

  if (isReactNativeFonts) {
    nodePath.node.specifiers?.forEach((specifier) => {
      const importedModule = specifier?.local?.name;

      if (importedModule.split('use').length > 1) {
        if (importedModule.split('use')[1] === 'CustomFont')
          prepareFont('test');
        else onNewImportedFont(importedModule.split('use')[1]!);
      }
    });
  }
};
