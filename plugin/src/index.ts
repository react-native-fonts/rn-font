import * as fs from 'fs';
import path from 'path';
import type { PluginObj } from '@babel/core';
import type { NodePath } from '@babel/traverse';
import type { ImportDeclaration } from '@babel/types';

export default function (): PluginObj {
  const importedModules = new Set<string>();

  return {
    visitor: {
      ImportDeclaration(nodePath: NodePath<ImportDeclaration>) {
        const sourceValue = nodePath.node.source.value;
        if (sourceValue.includes('rn-font')) {
          nodePath.node.specifiers.forEach((specifier) => {
            if (specifier.local && specifier.local.name) {
              importedModules.add(specifier.local.name.split('use')[1]);
            }
          });
        }
      },
    },
    post() {
      fs.writeFile(
        path.join(__dirname, '../font/test.txt'),
        Array.from(importedModules).join('\n'),
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
