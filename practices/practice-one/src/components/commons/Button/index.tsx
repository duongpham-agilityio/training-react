import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';

// Styles
import styles from './button.module.css';

const selectTagName = {
  button: 'button',
  a: Link,
};

const selectSize = {
  sm: 'btnSm',
  md: 'btnMd',
  lg: 'btnLg',
  xl: 'btnXl',
};

const selectVariant = {
  default: 'btnDefault',
  primary: 'btnPrimary',
  secondary: 'btnSecondary',
  success: 'btnSuccess',
  danger: 'btnDanger',
  warning: 'btnWarning',
  info: 'btnInfo',
  light: 'btnLight',
  dark: 'btnDark',
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  Omit<LinkProps, 'to'> & {
    tag?: keyof typeof selectTagName;
    size?: keyof typeof selectSize;
    variant?: keyof typeof selectVariant;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    href?: string;
    description?: string;
  };

const Button = (props: ButtonProps) => {
  const {
    tag = 'button',
    size = 'md',
    variant = 'default',
    className = '',
    href = '',
    description = '',
    leftIcon,
    rightIcon,
    children,
    ...rest
  } = props;
  const TagName = selectTagName[tag];
  const classes = `${styles.btn} ${styles[selectVariant[variant]]} ${
    styles[selectSize[size]]
  } ${className}`;
  const attributes = {
    ...rest,
    to: href,
    className: classes,
  };

  return (
    <TagName {...attributes}>
      {leftIcon && <span className={styles.btnIcon}>{leftIcon}</span>}
      {children || description}
      {rightIcon && <span className={styles.btnIcon}>{rightIcon}</span>}
    </TagName>
  );
};

export default memo(Button);
