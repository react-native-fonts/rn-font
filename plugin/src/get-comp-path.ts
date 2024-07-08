import type { PluginPass } from '@babel/core';
import { correctReactExts } from './utils/correct-react-exts';

interface IGetCompPath {
  state: PluginPass;
  getComponentPath: (filePath: string) => void;
}

export const getCompPath = ({ state, getComponentPath }: IGetCompPath) => {
  const fileGlobalPath = state.filename;
  const fileRootPath = fileGlobalPath?.split(process.cwd()).pop()!;
  const fileExtension = fileRootPath?.split('.').pop()!;

  if (!correctReactExts.includes(fileExtension)) return;

  const filePathWithoutExtension = fileRootPath.slice(
    0,
    fileRootPath.lastIndexOf('.')
  );

  if (!filePathWithoutExtension) return;

  getComponentPath(filePathWithoutExtension);
};
