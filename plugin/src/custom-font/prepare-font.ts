import { downloadFont } from './';

export const prepareFont = (fontPath: string, fontName: string | undefined) => {
  downloadFont(fontPath, fontName);
};
