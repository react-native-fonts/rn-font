import type { Font } from './getFontDownloadUrls';
import type { ParsedFonts } from './parseFontUsages';
import path from 'path';
import { fontDownload } from './fontDownload';

export const linkFontForAndroid = (
  parsedFontValues: ParsedFonts,
  fontDownloadUrls: Font[]
) => {
  console.log('linkFontForAndroid', fontDownloadUrls, parsedFontValues);
  const androidFilePath = path.join(
    process.cwd(),
    'android/app/src/main/res/font'
  );

  fontDownload(fontDownloadUrls, androidFilePath);
};
