import type { Font } from './';
export declare const getFontName: (font: Font) => string;
export declare const getFontFileName: (font: Font, ext: string) => string;
declare const fontDownload: (
  fontDownloadUrls: Font[],
  filePath: string,
  onSuccess?: () => void
) => void;
export default fontDownload;
