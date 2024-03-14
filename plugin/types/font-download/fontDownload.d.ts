import type { Font } from './getFontDownloadUrls';
export declare const getFontFileName: (font: Font, ext: string) => string;
export declare const fontDownload: (
  fontDownloadUrls: Font[],
  filePath: string,
  onSuccess?: () => void
) => void;
