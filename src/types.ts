export type Display = 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
export type FontExtension = 'woff' | 'woff2' | 'ttf' | 'otf' | 'eot';
export type FontPath = `${string}/${string}.${FontExtension}`;
export type FontName = string & { _properFontName: never };

export interface FontData<T> {
  fontFamily: string;
  options: T;
}
