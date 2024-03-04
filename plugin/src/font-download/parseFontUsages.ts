import fs from 'fs';
import type { ArrayedFont, FontOptions } from '../types';

interface ParseFontUsages {
  paths: string[];
}

export interface ParsedFonts {
  [key: string]: ArrayedFont;
}

const parseFontUsages = ({ paths }: ParseFontUsages): ParsedFonts => {
  let fontCache: any = {};

  paths.forEach((filePath) => {
    const file = fs.readFileSync(filePath, 'utf-8');
    const fileJSON = JSON.parse(file);
    Object.keys(fileJSON).forEach((fontName) => {
      if (!fontCache[fontName]) {
        fontCache[fontName] = Object.keys(fileJSON[fontName]).reduce(
          (acc: Partial<ArrayedFont>, option) => {
            // option = e.g. weight, style etc.
            const fontOption = option as FontOptions;

            acc[fontOption] =
              typeof fileJSON[fontName][option] === 'string'
                ? [...new Set([fileJSON[fontName][option]])]
                : [...new Set(fileJSON[fontName][option])];
            return acc;
          },
          {}
        );

        return;
      }

      // make sure all fonts usage are included
      Object.keys(fileJSON[fontName]).forEach((option) => {
        // option = e.g. weight, style etc.
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

  return fontCache;
};

export default parseFontUsages;
