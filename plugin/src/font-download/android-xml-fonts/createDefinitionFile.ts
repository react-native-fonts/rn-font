import fs from 'fs';
import path from 'path';
import type { ParsedFonts } from '../parseFontUsages';
import type { ArrayedFont } from '../../types';
import { getFontName } from '../fontDownload';

export default function createDefinitionFile(fonts: ParsedFonts) {
  if (!fonts) return;

  Object.keys(fonts).forEach((key) => {
    const value = fonts[key] as ArrayedFont;

    const dir = path.join(
      process.cwd(),
      `android/app/src/main/res/font/${key
        .toLowerCase()
        .replaceAll(' ', '_')}.xml`
    );

    const fontVariations = value.style.map((style) => {
      return value.weight
        .map((weight) => {
          return `\t<font app:fontStyle="${style}" app:fontWeight="${weight}" app:font="@font/${getFontName(
            { fontFamily: key, fontWeight: weight, fontStyle: style, src: '' }
          )}" />`;
        })
        .join('\n');
    });

    const fileContent = `<?xml version="1.0" encoding="utf-8"?>\n<font-family xmlns:app="http://schemas.android.com/apk/res-auto">\n${fontVariations.join(
      '\n'
    )}\n</font-family>`;

    fs.writeFileSync(dir, fileContent);
  });
}
