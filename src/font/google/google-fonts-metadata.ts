import fontData from './font-data.json';

type GoogleFontsMetadata = {
  [K in keyof typeof fontData]: {
    weights: string[];
    styles: string[];
    subsets: string[];
    axes?: Array<{
      tag: string;
      min: number;
      max: number;
      defaultValue: number;
    }>;
  };
};

export const googleFontsMetadata: GoogleFontsMetadata = fontData;
