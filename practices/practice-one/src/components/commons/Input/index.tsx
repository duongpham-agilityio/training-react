import { InputHTMLAttributes, ReactNode } from 'react';

// Styles
import styles from './input.module.css';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  customInput?: string;
};

const Input = (props: InputProps) => {
  const {
    className = '',
    customInput = '',
    leftIcon,
    rightIcon,
    ...rest
  } = props;
  const classes = `${styles.fieldValue} ${customInput}`;
  const attributes = {
    ...rest,
    className: classes,
  };

  return (
    <div className={`${styles.input} ${className}`}>
      {leftIcon && <span className={styles.inputIcon}>{leftIcon}</span>}
      <input {...attributes} />
      {rightIcon && <span className={styles.inputIcon}>{rightIcon}</span>}
    </div>
  );
};

export default Input;
