export type Display = 'auto' | 'block' | 'swap' | 'fallback' | 'optional';

export type FontOptions = 'style' | 'weight' | 'display' | 'subsets';

export type Font = {
  style: 'normal' | 'italic' | ('normal' | 'italic')[];
  weight: string | string[];
  display: Display;
  subsets: string[];
};
