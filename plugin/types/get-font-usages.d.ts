import type { NodePath } from '@babel/core';
import type { CallExpression } from '@babel/types';
type GetFontUsages = {
  fontUsages: any;
  importedFonts: string[];
};
export declare const getFontUsages: (
  nodePath: NodePath<CallExpression>,
  { fontUsages, importedFonts }: GetFontUsages
) => void;
export {};
