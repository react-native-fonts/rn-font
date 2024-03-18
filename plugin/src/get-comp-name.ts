import type { PluginPass } from '@babel/core';

export const getCompName = (
  state: PluginPass,
  getCompPath: (filePath: string) => void
) => {
  const fileGlobalPath = state.filename;
  const fileRootPath = fileGlobalPath?.split(process.cwd()).pop();
  const fileExtension = fileRootPath?.split('.').pop();

  if (
    fileExtension !== 'ts' &&
    fileExtension !== 'tsx' &&
    fileExtension !== 'js' &&
    fileExtension !== 'jsx'
  )
    return;

  const filePathWithoutExtension = fileRootPath?.split('.').shift();

  if (!filePathWithoutExtension) return;

  getCompPath(filePathWithoutExtension);
};
