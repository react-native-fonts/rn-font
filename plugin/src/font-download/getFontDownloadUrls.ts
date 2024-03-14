import fetch from 'node-fetch';

export type Font = {
  fontFamily: string;
  fontStyle: string;
  fontWeight: string;
  src: string;
};

export default async function getFontDownloadUrls(fontsGoogleURls: string[]) {
  const downloadUrls: Font[] = [];

  const getFontFaces = async (url: string) => {
    const res = await fetch(url);
    const text = await res.text();
    const fonts: Font[] = parseFontFaces(text);
    downloadUrls.push(...fonts);
  };

  await Promise.all(fontsGoogleURls.map(getFontFaces));
  return downloadUrls;
}

function parseFontFaces(text: string): Font[] {
  console.log(text);
  const fonts: Font[] = [];
  const fontFaceRegex = /@font-face\s*{([\s\S]*?)}/gm;
  let match;
  while ((match = fontFaceRegex.exec(text)) !== null) {
    const font: Font = {
      fontFamily: '',
      fontStyle: '',
      fontWeight: '',
      src: '',
    };
    const declarations = match[1]!
      .split(';')
      .map((declaration) => declaration.trim());
    declarations.forEach((declaration) => {
      const [property, value] = declaration
        .split(': ')
        .map((part) => part.trim());
      switch (property) {
        case 'font-family':
          font.fontFamily = value!.replace(/'/g, '');
          break;
        case 'font-style':
          font.fontStyle = value!;
          break;
        case 'font-weight':
          font.fontWeight = value!;
          break;
        case 'src':
          font.src = value!;
          break;
        default:
          break;
      }
    });
    fonts.push(font);
  }
  return fonts;
}
