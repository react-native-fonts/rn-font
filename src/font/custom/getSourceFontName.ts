import type { FontPath } from '../types';

const getSourceFontName = (source: FontPath) =>
  source.split('/').reverse()[0]?.split('.')[0];

export default getSourceFontName;
