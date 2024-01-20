import type { Fonts } from './fonts';
import { useState } from 'react';
import { nextFontGoogleFontLoader } from './loader';

type FontLoaderProps<T extends keyof Fonts> = {
  fontFamily: T;
  options: Fonts[T];
};

export const useFont = <T extends keyof Fonts>(args: FontLoaderProps<T>) => {
  // const { name, options: fontOptions } = args;
  // type a = keyof Fonts;
  const [isLoaded, setIsLoaded] = useState(false);

  nextFontGoogleFontLoader({
    functionName: args.fontFamily,
    data: args.options,
  }).then(() => setIsLoaded(true));

  return {
    isLoaded,
  };
};
