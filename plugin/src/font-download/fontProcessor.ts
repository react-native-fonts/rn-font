import path from 'path';
import { exec } from 'child_process';
import { readFontOptionsFilesPath } from '../font-options';
import { createDefinitionFile, registerFont } from './android-xml-fonts/';
import {
  getFontDownloadUrls,
  getFontsUrls,
  parseFontUsages,
  cleanupUnusedFonts,
  fontDownload,
} from './';
import { fontPath } from '../font-paths';
import { isLibraryExample } from '../isLibraryExample';

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
      isLibraryExample
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
