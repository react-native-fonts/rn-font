import fs from 'fs';
import type { Font, FontOptions } from './types';

interface ParseFontUsages {
  paths: string[];
}

export const parseFontUsages = ({ paths }: ParseFontUsages) => {
  let fontCache: any = {};

  paths.forEach((filePath) => {
    const file = fs.readFileSync(filePath, 'utf-8');
    const fileJSON = JSON.parse(file);
    Object.keys(fileJSON).forEach((fontName) => {
      if (!fontCache[fontName]) {
        fontCache[fontName] = Object.keys(fileJSON[fontName]).reduce(
          (acc: Partial<Font>, option: string) => {
            // option = e.g. weight, subsets etc.
            acc[option as FontOptions] =
              typeof fileJSON[fontName][option] === 'string'
                ? [fileJSON[fontName][option]]
                : fileJSON[fontName][option];
            return acc;
          },
          {}
        );

        return;
      }

      // make sure all fonts usage are included
      Object.keys(fileJSON[fontName]).forEach((option) => {
        // option = e.g. weight, subsets etc.
        const cacheProp = fontCache[fontName][option];
        const valueProp = fileJSON[fontName][option];

        if (typeof valueProp === 'string') {
          cacheProp?.push(valueProp);
        } else if (Array.isArray(valueProp)) {
          cacheProp?.push(...valueProp);
        }
        // make them unique & sorted
        fontCache[fontName][option] = [...new Set(cacheProp)].sort();
      });
    });
  });
  console.log('last fontCache', fontCache);
};
