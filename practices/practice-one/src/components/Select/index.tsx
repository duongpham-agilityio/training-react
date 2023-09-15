import { SelectHTMLAttributes } from 'react';

// Styles
import styles from './select.module.css';

type OptionsType = {
  id: string;
  value: string;
  name: string;
};

type SelectionProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options?: OptionsType[];
};

const Selection = (props: SelectionProps) => {
  const { options, className = '', ...rest } = props;
  const classes = `${styles.selection} ${className}`;
  const attributes = {
    ...rest,
    className: styles.options,
  };

  return (
    <div className={classes}>
      <select {...attributes}>
        <option className={styles.selectionOption} value="">
          Select
        </option>
        {options?.map(({ value, name, id }) => (
          <option className={styles.selectionOption} value={value} key={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Selection;
