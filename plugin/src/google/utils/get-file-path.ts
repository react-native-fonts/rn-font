import type { PluginPass } from '@babel/core';
import { correctReactExts } from '../constants/react-exts';

export const getFilePath = (state: PluginPass) => {
  const fileGlobalPath = state.filename;
  const fileRootPath = fileGlobalPath?.split(process.cwd()).pop()!;
  const fileExtension = fileRootPath?.split('.').pop()!;

  if (!correctReactExts.includes(fileExtension)) {
    throw new Error('File extension is not supported');
  }

  return fileRootPath.slice(0, fileRootPath.lastIndexOf('.'));
};
