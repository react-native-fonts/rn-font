import type { ArrayedFont } from '../types';
interface ParseFontUsages {
  paths: string[];
}
export interface ParsedFonts {
  [key: string]: ArrayedFont;
}
declare const parseFontUsages: ({ paths }: ParseFontUsages) => ParsedFonts;
export default parseFontUsages;
