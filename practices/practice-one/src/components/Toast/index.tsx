import { HTMLAttributes, memo } from 'react';

// Styles
import styles from './toast.module.css';

export type TypeToast = {
  message?: string;
  type?: 'error' | 'success' | 'warning';
  display?: 'hidden' | 'visible';
  timeout: number;
};

type ToastProps = HTMLAttributes<HTMLDivElement> & TypeToast;

const Toast = (props: ToastProps) => {
  const {
    type = 'success',
    className = '',
    display = 'hidden',
    timeout,
    message,
    children,
    ...rest
  } = props;
  const classes = `${styles.toast} ${styles[display]} ${className} ${styles[type]}`;
  const attributes = {
    ...rest,
    className: classes,
  };

  return (
    <section
      {...attributes}
      style={{
        animationDuration: `${timeout / 1000}s`,
      }}
    >
      <p className={styles.toastMessage}>{children || message}</p>
    </section>
  );
};

export default memo(Toast);
