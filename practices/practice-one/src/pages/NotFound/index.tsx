// Components
import { Heading } from 'components';

// Types
import styles from './not-found.module.css';

const NotFoundPage = () => {
  return (
    <section className={styles.content}>
      <Heading
        description="Page not found."
        className={styles.heading}
        size="xl"
      />
    </section>
  );
};

export default NotFoundPage;
