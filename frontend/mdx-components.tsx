import type { MDXComponents } from 'mdx/types';

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

const mdxComponents: MDXComponents = {
  h1: (props) => <h1 className='text-foreground text-center tracking-wider' {...props} />,
  h2: (props) => <h2 className='text-foreground' {...props} />,
  strong: (props) => <strong className='text-foreground' {...props} />,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  };
}
