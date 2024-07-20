export const formatValues = (values: string[]) =>
  values.map((val) => `\`${val}\``).join(', ');
