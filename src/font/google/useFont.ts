import { useState } from 'react';
import { googleFontLoader } from './loader';

type FontLoaderProps<T> = {
  fontFamily: string;
  options: T;
};

export const useFont = <T>(args: FontLoaderProps<T>) => {
  const [isLoaded, setIsLoaded] = useState(false);

  googleFontLoader<T>({
    fontName: args.fontFamily,
    data: args.options,
  }).then(() => {
    setIsLoaded(true);
  });

  return {
    isLoaded,
    fontFamily: args.fontFamily.replaceAll('_', ' '),
    style: { fontFamily: args.fontFamily },
  };
};
