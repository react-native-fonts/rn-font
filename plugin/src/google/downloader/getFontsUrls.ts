import type { ParsedFonts } from './parseFontUsages';

const getFontsUrls = (fonts: ParsedFonts): string[] => {
  const urls: string[] = [];

  Object.keys(fonts)?.forEach((fontName) => {
    const font = fonts[fontName];

    if (!font) return;

    const { weight, style: styles = ['normal'] } = font;

    //number '0' before weight is for normal, '1' for italic
    //e.g. 0,400;0,700;1,400;1,700 (first must be normal, then italic)

    const weights = styles
      .toSorted((a, b) => (a === 'normal' ? -1 : b === 'normal' ? 1 : 0))
      .map((style) => {
        if (style === 'italic') {
          return weight.map((wgh) => `1,${wgh}`).join(';');
        } else {
          return weight.map((wgh) => `0,${wgh}`).join(';');
        }
      })
      .join(';');

    const url = `https://fonts.googleapis.com/css2?family=${fontName.replaceAll(
      '_',
      '+'
    )}:ital,wght@${weights}`;
    urls.push(url);
  });

  return urls;
};

export default getFontsUrls;
