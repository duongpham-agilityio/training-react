import { InputHTMLAttributes } from 'react';
import './input.css';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  customClass?: string;
};

export const Input = (props: InputProps) => {
  const { type = 'text', customClass = '', ...rest } = props;
  const className = `input-field ${customClass}`;

  return <input {...{ type, className, ...rest }} />;
};
