import type { FontPath } from '../types';

const getSourceFontName = (source: FontPath) =>
  source.split('/').pop()!.split('.')[0];

export default getSourceFontName;
