import { HTMLAttributes } from 'react';

type FormItemProps = HTMLAttributes<HTMLDivElement>;

export const FomrItem = (props: FormItemProps) => {
  const { children, className = '', ...rest } = props;
  const classes = `form-item ${className}`;

  return <div {...{ ...rest, className: classes }}>{children}</div>;
};
