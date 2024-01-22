import { validateGoogleFont } from './validate-google-font';

type FontLoaderProps<T> = {
  fontName: string;
  data: T;
};

type FontLoaderResult = Promise<{}>;

export const googleFontLoader = async <T>({
  fontName,
  data,
}: FontLoaderProps<T>): FontLoaderResult => {
  const { fontFamily, display, weights, subsets, styles } = validateGoogleFont(
    fontName,
    data
  );

  console.log(fontFamily, display, weights, subsets, styles);

  return {};
};
