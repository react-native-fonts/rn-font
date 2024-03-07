import type { PluginPass } from '@babel/core';
export declare const getCompName: (
  state: PluginPass,
  getCompPath: (filePath: string) => void
) => void;
