import type { Display } from '../types';

export const getFontsUrl = (options: {
  fontFamily: string;
  display: Display;
  weights: string[];
  subsets: string[];
  styles: string[];
}) => {
  const sortedWeights = options.weights.sort(
    (a, b) => parseFloat(a) - parseFloat(b)
  );

  //number '1' before weight is for italic, '0' for normal

  const weights = options.styles
    .map((style) => {
      if (style === 'italic') {
        return sortedWeights.map((weight) => `1,${weight}`).join(';');
      } else {
        return sortedWeights.map((weight) => `0,${weight}`).join(';');
      }
    })
    .join(';');

  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    options.fontFamily
  )}:ital,wght@${weights}&display=${options.display}`;

  return url;
};
