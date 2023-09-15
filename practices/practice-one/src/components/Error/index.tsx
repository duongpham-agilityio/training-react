import { FallbackProps } from 'react-error-boundary';

// Icons
import { AiOutlineWarning } from 'react-icons/ai';

// Styles
import styles from './error.module.css';
import container from 'styles/commons/container.module.css';

type ErrorProps = FallbackProps;

const ErrorFallback = ({ error }: ErrorProps) => {
  return (
    <div className={`${styles.error} ${container.container}`}>
      <AiOutlineWarning className={styles.icon} />
      <p className={styles.message}>{error.message}</p>
    </div>
  );
};

export default ErrorFallback;
