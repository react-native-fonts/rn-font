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
  console.log('Download font');
  const fontAxesFilesPath = readFontOptionsFilesPath();
  const parsedFontValues = parseFontUsages({ paths: fontAxesFilesPath });
  const fontsUrls = getFontsUrls(parsedFontValues);
  const fontDownloadUrls = await getFontDownloadUrls(fontsUrls);

  console.log(
    'fontDownloadUrls',
    fontDownloadUrls,
    fontsUrls,
    parsedFontValues,
    fontAxesFilesPath
  );

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
          // 'ls',
          process.env.BABEL_ENV === 'development'
            ? 'npx react-native-asset -a ../fonts'
            : 'npx react-native-asset -a ./node_modules/@react-native-fonts/fonts/fonts',
          (err, stdout, stderr) => {
            console.log(err, stdout, stderr);
            if (err) {
              console.error(err, stdout, stderr);
              return;
            }
          }
        );
      });
    });
  });
}
