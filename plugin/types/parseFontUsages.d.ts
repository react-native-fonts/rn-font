import type { ArrayedFont } from './types';
interface ParseFontUsages {
  paths: string[];
}
export interface ParsedFonts {
  [key: string]: ArrayedFont;
}
export declare const parseFontUsages: ({
  paths,
}: ParseFontUsages) => ParsedFonts;
export {};
