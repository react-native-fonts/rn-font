import https from 'https';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

import { readFontOptionsFilesPath } from '../font-options';
import {
  getFontDownloadUrls,
  getFontsUrls,
  parseFontUsages,
  type Font,
} from './';

export default async function downloadFontFile() {
  const fontAxesFilesPath = readFontOptionsFilesPath();
  const parsedFontValues = parseFontUsages({ paths: fontAxesFilesPath });
  const fontsUrls = getFontsUrls(parsedFontValues);
  const fontDownloadUrls = await getFontDownloadUrls(fontsUrls);

  fontDownloadUrls.forEach((font: Font) => {
    const fontUrlMatch = font.src.match(/url\(([^)]+)\)/);
    const fontUrl: string | null = fontUrlMatch
      ? fontUrlMatch[1] || null
      : null;
    const fileExt = (fontUrl || '').split('.').pop();
    const filePath = path.join(
      __dirname,
      `../../fonts/${font.fontFamily.toLowerCase()}-${font.fontWeight}-${
        font.fontStyle
      }.${fileExt}`
    );

    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    const file = fs.createWriteStream(filePath);

    https.get(fontUrl || '', (response) => {
      response.pipe(file);

      if (response.statusCode !== 200) {
        console.error(
          `Failed to download ${font.fontFamily}. Status code: ${response.statusCode}`
        );
        return;
      }

      file.on('finish', () => {
        file.close();
        console.log('Download Completed', filePath);

        exec(
          process.env.BABEL_ENV === 'development'
            ? '../fonts'
            : 'npx react-native-asset -a ./node_modules/@react-native-fonts/fonts/fonts'
        );
      });
    });
  });
}
