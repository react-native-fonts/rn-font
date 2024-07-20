import type { FontName } from '../../types';
import { FontError } from '../../errors/FontError';

const checkCustomFontName = (fontName: string) => {
  if (/^[\s.]/.test(fontName)) {
    FontError('FONT_NAME', 'Font name cannot contain a space or a period');
  }
  return fontName as FontName;
};

export default checkCustomFontName;
