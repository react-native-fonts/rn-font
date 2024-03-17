import fs from 'fs';
import path from 'path';
import https from 'https';
import type { Font } from './getFontDownloadUrls';
import { registerFont } from './android-xml-fonts';

const fontWeights = {
  '100': 'thin',
  '200': 'extralight',
  '300': 'light',
  '400': 'regular',
  '500': 'medium',
  '600': 'semibold',
  '700': 'bold',
  '800': 'extrabold',
  '900': 'black',
};

export const getFontName = (font: Font) => {
  return `${font.fontFamily.toLowerCase().replaceAll(' ', '_')}_${
    fontWeights[font.fontWeight as keyof typeof fontWeights]
  }${font.fontStyle !== 'normal' ? font.fontStyle : ''}`;
};

export const getFontFileName = (font: Font, ext: string) =>
  `${getFontName(font)}.${ext}`;

export const fontDownload = (
  fontDownloadUrls: Font[],
  filePath: string,
  onSuccess?: () => void
) => {
  fontDownloadUrls.forEach((font: Font) => {
    const fontUrlMatch = font.src.match(/url\(([^)]+)\)/);
    const fontUrl: string | null = fontUrlMatch
      ? fontUrlMatch?.[1] || null
      : null;

    //TODO: change error message
    if (!fontUrl || !fontUrl.split('.').pop)
      return console.error('No font url');

    const fileExt = fontUrl.split('.').pop()!;

    const pathWithFont = path.join(filePath, getFontFileName(font, fileExt));

    if (!fs.existsSync(path.dirname(pathWithFont))) {
      fs.mkdirSync(path.dirname(pathWithFont), { recursive: true });
    }

    const file = fs.createWriteStream(pathWithFont);

    https.get(fontUrl, (response) => {
      response.pipe(file);

      if (response.statusCode !== 200) {
        console.error(
          `Failed to download ${font.fontFamily}. Status code: ${response.statusCode}`
        );
        return;
      }

      file.on('finish', () => {
        file.close();

        registerFont(font.fontFamily);
        onSuccess?.();
      });
    });
  });
};
