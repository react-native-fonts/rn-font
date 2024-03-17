import path from 'path';
import { exec } from 'child_process';
import { readFontOptionsFilesPath } from '../font-options';
import { createDefinitionFile } from './android-xml-fonts/';
import {
  getFontDownloadUrls,
  getFontsUrls,
  parseFontUsages,
  cleanupUnusedFonts,
  fontDownload,
} from './';

export default async function fontProcessor() {
  const fontAxesFilesPath = readFontOptionsFilesPath();
  const parsedFontValues = parseFontUsages({ paths: fontAxesFilesPath });
  const fontsUrls = getFontsUrls(parsedFontValues);
  const fontDownloadUrls = await getFontDownloadUrls(fontsUrls);

  const filePath = path.join(__dirname, '../../fonts');
  const androidFilePath = path.join(
    process.cwd(),
    'android/app/src/main/res/font'
  );

  cleanupUnusedFonts(filePath, androidFilePath, fontDownloadUrls);
  fontDownload(fontDownloadUrls, androidFilePath);
  fontDownload(fontDownloadUrls, filePath, () => {
    exec(
      process.env.BABEL_ENV === 'development'
        ? 'npx react-native-asset -a ../fonts'
        : 'npx react-native-asset -a ./node_modules/@react-native-fonts/fonts/fonts',
      (err, stdout, stderr) => {
        if (err) {
          console.error(err, stdout, stderr);
          return;
        }
      }
    );
  });
  createDefinitionFile(parsedFontValues);
}
