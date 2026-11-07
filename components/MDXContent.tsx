import * as runtime from 'react/jsx-runtime';
import type { ComponentType } from 'react';
import type { MDXComponents } from 'mdx/types';

type MDXContentProps = {
  code: string;
  components: MDXComponents;
  [prop: string]: unknown;
};

type MDXModule = {
  default: ComponentType<{ components: MDXComponents; [prop: string]: unknown }>;
};

export function MDXContent({ code, components, ...props }: MDXContentProps) {
  // `function-body` output reads the JSX runtime from its first argument, see @mdx-js/mdx's runSync
  const { default: Content } = new Function(code)(runtime) as MDXModule;

  return <Content components={components} {...props} />;
}
