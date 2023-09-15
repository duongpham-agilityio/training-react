import { ButtonHTMLAttributes } from 'react';
import { LinkProps, Link } from 'react-router-dom';
import './button.css';

const tag = {
  button: 'button',
  a: Link,
};

const selectSize = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
};

const selectVariant = {
  default: 'btn-default',
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  success: 'btn-success',
  danger: 'btn-danger',
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  Omit<LinkProps, 'to'> & {
    tagName?: keyof typeof tag;
    size?: keyof typeof selectSize;
    variant?: keyof typeof selectVariant;
    title?: string;
    to?: string;
    a?: string;
  };

export const Button = (props: ButtonProps) => {
  const {
    tagName = 'button',
    size = 'md',
    variant = 'default',
    title,
    to = '',
    children,
    a,
    ...rest
  } = props;
  const TagName = tag[tagName];
  const className = `btn ${selectVariant[variant]} ${selectSize[size]}`;

  return (
    <TagName to={to} {...{ ...rest, className }}>
      {children || title}
      {a}
    </TagName>
  );
};
