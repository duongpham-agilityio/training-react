import { HTMLAttributes } from 'react';

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  title?: string;
};

export const Heading = (props: HeadingProps) => {
  const { tag = 'h2', title, children, ...rest } = props;
  const TagName = tag;
  const className = 'heading';

  return <TagName {...{ ...rest, className }}>{children || title}</TagName>;
};
