interface ParseFontUsages {
  paths: string[];
}

export const parseFontUsages = ({ paths }: ParseFontUsages) => {
  console.log('paths', paths);
};
