import type { NodePath } from '@babel/core';
import type { ImportDeclaration } from '@babel/types';
export declare const getImportedFontNames: (
  nodePath: NodePath<ImportDeclaration>,
  onNewImportedFont: (font: string) => void
) => void;
