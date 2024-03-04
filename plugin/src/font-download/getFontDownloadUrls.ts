import fetch from 'node-fetch';

type Font = {
  fontFamily: string;
  fontStyle: string;
  fontWeight: string;
  src: string;
};

const getFontDownloadUrls = (fontsGoogleURls: string[]) => {
  // const downloadUrls: string[] = [];

  fontsGoogleURls?.forEach((url) => {
    fetch(url)
      .then((res) => res.text())
      .then((text) => {
        const fonts: Font[] = parseFontFaces(text);
        console.log('fonts', fonts);
      });
  });
};

const parseFontFaces = (text: string): Font[] => {
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
};

export default getFontDownloadUrls;
