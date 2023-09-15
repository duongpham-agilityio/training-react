import { HTMLAttributes } from 'react';

// Styles
import styles from './heading.module.css';

const headingSize = {
  sm: 'headingSm',
  md: 'headingMd',
  lg: 'headingLg',
  xl: 'headingXl',
};

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  size?: keyof typeof headingSize;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  description?: string;
};

const Heading = (props: HeadingProps) => {
  const {
    size = 'md',
    tag = 'h2',
    className = '',
    description = '',
    children,
    ...rest
  } = props;
  const TagName = tag;
  const classes = `${styles.heading} ${className} ${styles[headingSize[size]]}`;
  const attributes = {
    ...rest,
    className: classes,
  };

  return <TagName {...attributes}>{children || description}</TagName>;
};

export default Heading;
