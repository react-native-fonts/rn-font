import { googleFontsMetadata } from './google-fonts-metadata';
import { formatValues } from './formatValues';
import fontData from './font-data.json';
import { FontError } from '../../errors/FontError';

type ValidateGoogleFontResult = {
  fontFamily: keyof typeof fontData;
  weights: string[];
  styles: string[];
};

export const validateGoogleFont = <T>(
  fontName: string,
  fontOptions: T
): ValidateGoogleFontResult => {
  let { weight, style = 'normal' } = fontOptions as any;

  if (fontName === '') {
    FontError('FONT_NAME', 'Please specify a font name');
  }

  const fontFamily = fontName.replace('_', ' ') as keyof typeof fontData;

  const fontFamilyData = googleFontsMetadata[fontFamily];

  if (!fontFamilyData) {
    FontError('FONT_FAMILY', `Font \`${fontFamily}\` is not recognized`);
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
    fontFamily,
    weights,
    styles,
  };
};
