import { useEffect, useState } from 'react';
import type { FontData } from '../../types';
import { validateGoogleFont } from './validate-google-font';

export const useFont = <T>(args: FontData<T>) => {
  const { fontFamily, options } = args;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    new Promise(() => {
      validateGoogleFont<T>({
        fontFamily,
        options,
      });
    }).then(() => {
      setIsLoaded(true);
    });
  }, [fontFamily, options]);

  return {
    isLoaded,
    fontFamily: fontFamily.replaceAll('_', ' '),
    style: { fontFamily },
  };
};
