import { validateGoogleFont } from './validate-google-font';
import { getFontsUrl } from './get-fonts-url';

type FontLoaderProps<T> = {
  fontName: string;
  data: T;
};

type FontLoaderResult = Promise<{}>;

export const googleFontLoader = async <T>({
  fontName,
  data,
}: FontLoaderProps<T>): FontLoaderResult => {
  const fontData = validateGoogleFont(fontName, data);

  const url = getFontsUrl(fontData);

  console.log(url);
  return {};
};
