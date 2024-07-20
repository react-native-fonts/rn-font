import type { FontPath } from '../../types';
import checkCustomFontName from './check-custom-font-name';
import getFontName from './get-font-name';

export const useCustomFont = (args: {
  source: FontPath;
  fontName?: string;
}) => {
  const { source, fontName } = args;

  return {
    fontFamily: fontName ? checkCustomFontName(fontName) : getFontName(source),
  };
};
