import path from 'path';
import { exec } from 'child_process';
import { createDefinitionFile, registerFont } from './android';
import {
  getFontDownloadUrls,
  getFontsUrls,
  parseFontUsages,
  cleanupUnusedFonts,
  fontDownload,
} from './';
import { fontPath } from '../utils/paths';
import { isExampleApp } from '../../utils/is-example-app';
import { readFontOptionsFilesPath } from '../watcher/font-options';

export default async function fontProcessor() {
  const fontAxesFilesPath = readFontOptionsFilesPath();
  const parsedFontValues = parseFontUsages({ paths: fontAxesFilesPath });
  const fontsUrls = getFontsUrls(parsedFontValues);
  const fontDownloadUrls = await getFontDownloadUrls(fontsUrls);

  const androidFilePath = path.join(
    process.cwd(),
    'android/app/src/main/res/font'
  );

  cleanupUnusedFonts(fontPath, androidFilePath, Object.keys(parsedFontValues));

  fontDownload(fontDownloadUrls, androidFilePath, () => {
    createDefinitionFile(parsedFontValues);
  });

  fontDownload(fontDownloadUrls, fontPath, () => {
    exec(
      isExampleApp
        ? 'npx react-native-asset -a ../fonts'
        : 'npx react-native-asset -a ./node_modules/react-native-simple-fonts/fonts',
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
    fontDownloadUrls.forEach((font) => registerFont(font.fontFamily));
  });
}
