import type { NodePath } from '@babel/core';
import type {
  CallExpression,
  ArgumentPlaceholder as BabelArgumentPlaceholder,
} from '@babel/types';
import type { Font, FontOptions } from './types';

type GetFontUsages = {
  fontUsages: any;
  importedFonts: string[];
};

interface ArgumentPlaceholder extends BabelArgumentPlaceholder {
  properties: any[];
}

interface PropertiesItem {
  key: {
    name: FontOptions;
  };
  value: {
    type: string;
    value: string;
    elements: { value: string }[];
  };
}

export const getFontUsages = (
  nodePath: NodePath<CallExpression>,
  { fontUsages, importedFonts }: GetFontUsages
) => {
  const callee = nodePath.get('callee');
  //@ts-ignore
  console.log('test1234', callee.node?.name?.slice(3));
  if (!callee.isIdentifier()) return;
  // validate if the function is a font usage
  if (!importedFonts.includes(callee.node.name.slice(3))) return;

  const babelArguments = nodePath.node?.arguments as ArgumentPlaceholder[];

  const value = babelArguments?.[0]?.properties?.reduce(
    (acc: Font, v: PropertiesItem) => {
      //@ts-ignore
      acc[v.key.name] =
        v.value.type === 'StringLiteral'
          ? v.value.value
          : v.value.elements?.map((item: { value: string }) => item.value);
      return acc;
    },
    {}
  ) as Font;

  value.style = value.style || ['normal'];

  const fontName = callee.node.name.slice(3);
  if (!fontUsages[fontName]) {
    fontUsages[fontName] = {
      weight: typeof value?.weight === 'string' ? [value.weight] : value.weight,
      style: typeof value?.style === 'string' ? [value.style] : value.style,
    };
    return;
  }
  // validate double usage of the same font in the same file
  const options = ['weight', 'style'] as const;
  options.forEach((option) => {
    const cacheProp = fontUsages[fontName][option];
    const valueProp = value[option];
    if (typeof valueProp === 'string') {
      cacheProp?.push(valueProp);
    } else if (Array.isArray(valueProp)) {
      cacheProp?.push(...valueProp);
    }
    fontUsages[fontName][option] = [...new Set(cacheProp)];
  });
};
