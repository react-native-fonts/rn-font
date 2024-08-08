export type FontOptions = 'style' | 'weight';

export type Font = {
  style: 'normal' | 'italic' | ('normal' | 'italic')[];
  weight: string | string[];
};

export type ArrayedFont = {
  style: ('normal' | 'italic')[];
  weight: string[];
};
