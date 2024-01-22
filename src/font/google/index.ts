import type { Fonts } from './fonts';
import { useState } from 'react';
import { googleFontLoader } from './loader';

type FontLoaderProps<T extends keyof Fonts> = {
  fontFamily: T;
  options: Fonts[T];
};

export const useFont = <T extends keyof Fonts>(args: FontLoaderProps<T>) => {
  const [isLoaded, setIsLoaded] = useState(false);

  googleFontLoader({
    fontName: args.fontFamily,
    data: args.options,
  }).then(() => setIsLoaded(true));

  return {
    isLoaded,
  };
};
