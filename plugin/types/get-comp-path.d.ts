import type { PluginPass } from '@babel/core';
interface IGetCompPath {
  state: PluginPass;
  getComponentPath: (filePath: string) => void;
}
export declare const getCompPath: ({
  state,
  getComponentPath,
}: IGetCompPath) => void;
export {};
