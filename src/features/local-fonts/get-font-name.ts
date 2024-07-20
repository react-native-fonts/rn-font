import type { FontPath } from '../../types';

const getFontName = (source: FontPath) =>
  source.split('/').reverse()[0]?.split('.')[0];

export default getFontName;
