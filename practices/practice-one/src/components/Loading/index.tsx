import { HTMLAttributes } from 'react';

// Styles
import styles from './loading.module.css';

const loadingVariant = {
  default: 'default',
  primary: 'primary',
  secondary: 'secondary',
};

type LoadingProps = HTMLAttributes<HTMLDivElement> & {
  variant?: keyof typeof loadingVariant;
};

const Loading = (props: LoadingProps) => {
  const { variant = 'default', className = '', ...rest } = props;
  const classes = `${styles.loading} ${className}`;

  return (
    <section {...rest} className={classes}>
      <div
        className={`${styles.loadingItem} ${styles[loadingVariant[variant]]}`}
      ></div>
    </section>
  );
};

export default Loading;
