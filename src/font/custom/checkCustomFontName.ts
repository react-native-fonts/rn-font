import type { FontName } from '../types';

const checkCustomFontName = (fontName: string) => {
  if (/^[\s.]/.test(fontName)) {
    throw new Error('Font name cannot contain a space or a period');
  }
  return fontName as FontName;
};

export default checkCustomFontName;
