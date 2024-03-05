import { validateGoogleFont } from './validate-google-font';

type FontLoaderProps<T> = {
  fontName: string;
  data: T;
};

export const googleFontLoader = async <T>({
  fontName,
  data,
}: FontLoaderProps<T>) => {
  validateGoogleFont(fontName, data);
};
