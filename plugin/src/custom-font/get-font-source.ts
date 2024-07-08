import type { NodePath } from '@babel/core';
import type { CallExpression } from '@babel/types';

export const getFontSource = (nodePath: NodePath<CallExpression>) => {
  const callee = nodePath.get('callee');

  if (callee.isIdentifier({ name: 'useCustomFont' })) {
    const args = nodePath.get('arguments');

    if (args.length === 0) {
      throw new Error('useCustomFont requires at least one argument');
    }

    const firstArg = args[0];

    if (!firstArg) {
      throw new Error('useCustomFont -> argument is required');
    }

    if (!firstArg.isObjectExpression()) {
      throw new Error('useCustomFont -> first argument must be an object');
    }

    const properties = firstArg.node.properties as any[];
    const source = properties.find((prop) => prop.key.name === 'source').value
      .value;

    console.log('source', source);
  }
};
