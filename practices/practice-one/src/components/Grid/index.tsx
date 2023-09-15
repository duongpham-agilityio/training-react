import { HTMLAttributes } from 'react';

// Styles
import styles from './grid.module.css';

type GridProps = HTMLAttributes<HTMLDivElement> & {
  col?: number;
  row?: number;
  gap?: number;
};

const Grid = (props: GridProps) => {
  const {
    className = '',
    col = 4,
    row = 1,
    gap = 20,
    children,
    ...rest
  } = props;
  const classes = `${styles.grid} ${className}`;
  const style = {
    gridTemplateColumns: `repeat(${col}, 1fr)`,
    gridTemplateRows: `repeat(${row}, 1fr)`,
    gridGap: `${gap}px`,
  };
  const attributes = {
    ...rest,
    className: classes,
    style,
  };

  return <div {...attributes}>{children}</div>;
};

export default Grid;
