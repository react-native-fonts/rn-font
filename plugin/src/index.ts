import type { PluginObj } from '@babel/core';
import type { ArgumentPlaceholder as BabelArgumentPlaceholder } from '@babel/types';
import { parseFontUsages } from './parseFontUsages';
import type { Font, FontOptions } from './types';
import fontOptions from './fontOptions';

interface ArgumentPlaceholder extends BabelArgumentPlaceholder {
  properties: any[];
}

interface PropertiesItem {
  key: {
    name: FontOptions;
  };
  value: {
    type: string;
    value: string;
    elements: { value: string }[];
  };
}

export default function (): PluginObj {
  const importedFonts: string[] = [];
  let fontCache: any = {};
  let filePath: string = '';
  console.log(filePath);
  return {
    visitor: {
      Program(_, state) {
        const fileGlobalPath = state.filename;
        const fileRootPath = fileGlobalPath?.split(process.cwd()).pop();
        const fileExtension = fileRootPath?.split('.').pop();

        if (fileExtension !== 'ts' && fileExtension !== 'tsx') return;

        const filePathWithoutExtension = fileRootPath?.split('.').shift();

        if (!filePathWithoutExtension) return;

        filePath = filePathWithoutExtension;
        console.log('Currently processing file:', filePathWithoutExtension);
      },
      ImportDeclaration(nodePath) {
        const sourceValue = nodePath.node.source.value;
        if (sourceValue.includes('rn-font')) {
          nodePath.node.specifiers.forEach((specifier) => {
            const importedModule = specifier?.local?.name;

            if (importedModule.split('use').length > 1) {
              importedFonts.push(importedModule.split('use')[1]!);
            }
          });
        }
      },
      CallExpression: {
        enter(babelPath) {
          const callee = babelPath.get('callee');

          if (!callee.isIdentifier()) return;
          if (!importedFonts.includes(callee.node.name.slice(3))) return;

          const babelArguments = babelPath.node
            ?.arguments as ArgumentPlaceholder[];

          const value = babelArguments?.[0]?.properties?.reduce(
            (acc: Font, v: PropertiesItem) => {
              //@ts-ignore
              acc[v.key.name] =
                v.value.type === 'StringLiteral'
                  ? v.value.value
                  : v.value.elements?.map(
                      (item: { value: string }) => item.value
                    );
              return acc;
            },
            {}
          ) as Font;
          console.log(value);
          const fontName = callee.node.name.slice(3);
          if (!fontCache[fontName]) {
            fontCache[fontName] = {
              weight:
                typeof value?.weight === 'string'
                  ? [value.weight]
                  : value.weight,
              style:
                typeof value?.style === 'string' ? [value.style] : value.style,
              display: value.display ? [value.display] : undefined,
              subsets: value.subsets,
            };
            return;
          }
          // validate double usage of the same font in the same file
          const options = ['weight', 'style', 'display', 'subsets'] as const;
          options.forEach((option) => {
            const cacheProp = fontCache[fontName][option];
            const valueProp = value[option];
            if (typeof valueProp === 'string') {
              cacheProp?.push(valueProp);
            } else if (Array.isArray(valueProp)) {
              cacheProp?.push(...valueProp);
            }
            fontCache[fontName][option] = [...new Set(cacheProp)];
          });
        },
      },
    },
    post() {
      try {
        fontOptions.watchDirChanges();
        fontOptions.createFontAxesFile(filePath, fontCache);
      } catch (err) {
        console.error(err);
      }
      const fontAxesFilesPath = fontOptions.readFontOptionsFilesPath();

      parseFontUsages({ paths: fontAxesFilesPath });
      fontCache = {};
    },
  };
}
