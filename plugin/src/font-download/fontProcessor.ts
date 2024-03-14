import path from 'path';
import { exec } from 'child_process';
import { readFontOptionsFilesPath } from '../font-options';
import { getFontDownloadUrls, getFontsUrls, parseFontUsages } from './';
import { linkFontForAndroid } from './linkFontForAndroid';
import { fontDownload } from './fontDownload';

export default async function fontProcessor() {
  console.log('Download font');
  const fontAxesFilesPath = readFontOptionsFilesPath();
  const parsedFontValues = parseFontUsages({ paths: fontAxesFilesPath });
  const fontsUrls = getFontsUrls(parsedFontValues);
  const fontDownloadUrls = await getFontDownloadUrls(fontsUrls);
  linkFontForAndroid(parsedFontValues, fontDownloadUrls);

  console.log('parsedFontValues', parsedFontValues);

  const filePath = path.join(__dirname, '../../fonts');

  fontDownload(fontDownloadUrls, filePath, () => {
    exec(
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
}
