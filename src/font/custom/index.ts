import type { FontPath } from '../types';
import checkCustomFontName from './checkCustomFontName';
import getSourceFontName from './getSourceFontName';

export const useCustomFont = (args: {
  source: FontPath;
  fontName?: string;
}) => {
  const { source, fontName } = args;

  return {
    fontFamily: fontName
      ? checkCustomFontName(fontName)
      : getSourceFontName(source),
  };
};
