import * as fs from 'fs';
import path from 'path';
import type { PluginObj } from '@babel/core';
import { parseFontUsages } from './parseFontUsages';
import { readFontAxesFilesPath } from './readFontAxesFilesPath';

export default function (): PluginObj {
  const importedFonts: string[] = [];
  let fontCache: any = {};
  let filePath: string = '';
  console.log(filePath);
  return {
    visitor: {
      Program(_: any, state) {
        const fileGlobalPath = state.filename;
        // const fileNameTemp = filePath?.split('/').pop();
        const fileRootPath = fileGlobalPath?.split(process.cwd()).pop();
        const fileExtension = fileRootPath?.split('.').pop();
        console.log('Currently processing file:', fileRootPath);
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
      CallExpression(path) {
        const callee = path.get('callee');

        if (!callee.isIdentifier()) return;
        if (!importedFonts.includes(callee.node.name.slice(3))) return;
        //@ts-ignore
        const value = path.node?.arguments?.[0]?.properties?.reduce(
          (acc: any, v: any) => {
            acc[v.key.name] =
              v.value.type === 'StringLiteral'
                ? v.value.value
                : v.value.elements?.map((item: any) => item?.value);
            return acc;
          },
          {}
        );
        const fontName = callee.node.name.slice(3);
        if (!fontCache[fontName]) {
          fontCache[fontName] = {
            weight:
              typeof value.weight === 'string' ? [value.weight] : value.weight,
            style:
              typeof value.style === 'string' ? [value.style] : value.style,
            display:
              typeof value.display === 'string'
                ? [value.display]
                : value.display,
            subsets:
              typeof value.subsets === 'string'
                ? [value.subsets]
                : value.subsets,
          };
          return;
        }

        ['weight', 'style', 'display', 'subsets'].forEach((prop) => {
          const cacheProp = fontCache[fontName][prop];
          const valueProp = value[prop];
          if (typeof valueProp === 'string') {
            cacheProp.push(valueProp);
          } else if (Array.isArray(valueProp)) {
            cacheProp.push(...valueProp);
          }
          fontCache[fontName][prop] = [...new Set(cacheProp)];
        });
      },
    },
    post() {
      try {
        const folderPathWithoutFileName = filePath
          .split('/')
          .slice(0, -1)
          .join('/');

        const folderPath = path.join(
          __dirname,
          `../font${
            folderPathWithoutFileName ? `/${folderPathWithoutFileName}` : ''
          }`
        );

        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath, { recursive: true });
        }

        fs.writeFileSync(
          path.join(__dirname, `../font/${filePath}.json`),
          JSON.stringify(fontCache, null, 2),
          { flag: 'w' }
        );
      } catch (err) {
        console.error(err);
      }
      const fontAxesFilesPath = readFontAxesFilesPath();

      parseFontUsages({ paths: fontAxesFilesPath });
      fontCache = {};
    },
  };
}
