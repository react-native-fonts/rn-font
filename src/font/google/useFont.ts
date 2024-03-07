import { useState } from 'react';
import { googleFontLoader } from './loader';

type FontLoaderProps<T> = {
  fontFamily: string;
  options: T;
};

export const useFont = <T>(args: FontLoaderProps<T>) => {
  const [isLoaded, setIsLoaded] = useState(false);

  console.log(args);
  googleFontLoader<T>({
    fontName: args.fontFamily,
    data: args.options,
  }).then(() => {
    setIsLoaded(true);
  });

  return {
    isLoaded,
    style: { fontFamily: args.fontFamily },
  };
};
