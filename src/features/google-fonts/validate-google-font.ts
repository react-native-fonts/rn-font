import { googleFontsMetadata } from './google-fonts-metadata';
import { formatValues } from './format-values';
import fontData from './font-data.json';
import { FontError } from '../../errors/FontError';
import type { FontData } from '../../types';

type ValidateGoogleFontResult = {
  fontName: keyof typeof fontData;
  weights: string[];
  styles: string[];
};

export const validateGoogleFont = <T>(
  args: FontData<T>
): ValidateGoogleFontResult => {
  const { fontFamily, options } = args;
  let { weight, style = 'normal' } = options as any;

  if (fontFamily === '') {
    FontError('FONT_NAME', 'Please specify a font name');
  }

  const fontName = fontFamily.replace('_', ' ') as keyof typeof fontData;

  const fontFamilyData = googleFontsMetadata[fontName];

  if (!fontFamilyData) {
    FontError('FONT_FAMILY', `Font \`${fontName}\` is not recognized`);
  }

  const fontWeights = fontFamilyData?.weights;
  const fontStyles = fontFamilyData?.styles;

  // Unique weights and styles
  const weights = [...new Set(Array.isArray(weight) ? weight : [weight])];
  const styles = [...new Set(Array.isArray(style) ? style : [style])];

  if (weights.length === 0) {
    FontError(
      'FONT_WEIGHT',
      `Please provide a weight for font \`${fontFamily}\`.\nAvailable weights: ${formatValues(
        fontWeights
      )}`
    );
  }

  weights?.forEach((currentWeight) => {
    if (!fontWeights?.includes(currentWeight)) {
      FontError(
        'FONT_WEIGHT',
        `Weight \`${currentWeight}\` is not valid for font \`${fontFamily}\`.\nAvailable weights: ${formatValues(
          fontWeights
        )}`
      );
    }
  });

  if (styles.length === 0) {
    fontStyles?.length === 1
      ? styles.push(fontStyles[0])
      : styles.push('normal');
  }

  styles.forEach((selectedStyle) => {
    if (!fontStyles?.includes(selectedStyle)) {
      FontError(
        'FONT_STYLE',
        `Style \`${selectedStyle}\` is not valid for font \`${fontFamily}\`.\nAvailable styles: ${formatValues(
          fontStyles
        )}`
      );
    }
  });

  return {
    fontName,
    weights,
    styles,
  };
};
