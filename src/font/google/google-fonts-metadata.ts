import fontData from './font-data.json';

type GoogleFontsMetadata = {
  [K in keyof typeof fontData]: {
    weights: string[];
    styles: string[];
    subsets: string[];
  };
};

export const googleFontsMetadata: GoogleFontsMetadata = fontData;
