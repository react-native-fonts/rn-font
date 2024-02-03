import * as fs from 'fs';
import path from 'path';
import type { PluginObj } from '@babel/core';
import type { NodePath } from '@babel/traverse';
import type { ImportDeclaration } from '@babel/types';

export default function (): PluginObj {
  const importedFonts = new Set<string>();

  return {
    visitor: {
      ImportDeclaration(nodePath: NodePath<ImportDeclaration>) {
        const sourceValue = nodePath.node.source.value;
        if (sourceValue.includes('rn-font')) {
          nodePath.node.specifiers.forEach((specifier) => {
            const importedModule = specifier?.local?.name;

            if (importedModule.split('use').length > 1) {
              importedFonts.add(importedModule.split('use')[1]!);
            }
          });
        }
      },
    },
    post() {
      fs.writeFile(
        path.join(__dirname, '../font/test.txt'),
        Array.from(importedFonts).join('\n'),
        (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log('success');
          }
        }
      );
    },
  };
}
