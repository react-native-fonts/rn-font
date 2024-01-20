type FontLoaderProps<T> = {
  functionName: string;
  data: T;
};

type FontLoaderResult = Promise<{}>;

export const nextFontGoogleFontLoader = async <T>({
  functionName,
  data,
}: FontLoaderProps<T>): FontLoaderResult => {
  console.log(functionName, data);

  return {};
};
