import path from 'path';
import { exec } from 'child_process';
import { readFontOptionsFilesPath } from '../font-options';
import { getFontDownloadUrls, getFontsUrls, parseFontUsages } from './';
import { linkFontForAndroid } from './android-xml-fonts/linkFontForAndroid';
import { fontDownload } from './fontDownload';

export default async function fontProcessor() {
  const fontAxesFilesPath = readFontOptionsFilesPath();
  const parsedFontValues = parseFontUsages({ paths: fontAxesFilesPath });
  const fontsUrls = getFontsUrls(parsedFontValues);
  const fontDownloadUrls = await getFontDownloadUrls(fontsUrls);
  linkFontForAndroid(parsedFontValues, fontDownloadUrls);

  const filePath = path.join(__dirname, '../../fonts');
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
}
