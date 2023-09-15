import { ChangeEvent, memo, MouseEvent, useState } from 'react';

// Components
import { Select as Selection } from 'components';
import { Button, Input } from 'components/commons';

// Constants
import { BRANDS, MAX_RANGE, MIN_RANGE, SORTS } from '@constants';

// Styles
import filterStyles from './filter.module.css';

export type FilterType = {
  brand: string;
  sortBy: string;
  rangePrice: string;
};

// eslint-disable-next-line no-unused-vars
export type OnFilter = (filter: FilterType) => void;

type FilterProps = {
  filter: FilterType;
  onFilter: OnFilter;
  onReset: () => void;
  // eslint-disable-next-line no-unused-vars
  onCloseFilter: (e: MouseEvent) => void;
};

const FilterModal = (props: FilterProps) => {
  const { filter: filterProp, onFilter, onCloseFilter } = props;
  const [filter, setFilter] = useState<FilterType>(filterProp);

  const changeFilter = (e: ChangeEvent) => {
    const element: HTMLInputElement | HTMLSelectElement = e.target as
      | HTMLInputElement
      | HTMLSelectElement;
    const { name: key, value } = element;

    setFilter({
      ...filter,
      [key]: value,
    });
  };

  const resetFilter = () => {
    setFilter({
      brand: '',
      rangePrice: `${MAX_RANGE}`,
      sortBy: SORTS[0].value,
    });
  };

  return (
    <section className={filterStyles.filterOverlay} onClick={onCloseFilter}>
      <div
        className={filterStyles.filterBox}
        onClick={(e: MouseEvent) => e.stopPropagation()}
      >
        <div className={filterStyles.filterItem}>
          <div className={filterStyles.filterDropdown}>
            <p className={filterStyles.filterText}>brand</p>
            <Selection
              className={filterStyles.filterSelection}
              options={BRANDS}
              value={filter.brand}
              onChange={changeFilter}
              name="brand"
            />
          </div>
          <div className={filterStyles.filterDropdown}>
            <p className={filterStyles.filterText}>sort by</p>
            <Selection
              className={filterStyles.filterSelection}
              value={filter.sortBy}
              onChange={changeFilter}
              name="sortBy"
              options={SORTS}
            />
          </div>
        </div>
        <div className={filterStyles.filterItem}>
          <div className={filterStyles.filterRange}>
            <p className={filterStyles.filterText}>price pange</p>
            <div className={filterStyles.filterData}>
              <span className={filterStyles.filterDataItem}>{MIN_RANGE}</span>
              <span className={filterStyles.filterDataItem}>
                {filter.rangePrice}
              </span>
            </div>
            <Input
              type="range"
              className={filterStyles.input}
              customInput={filterStyles.inputRange}
              min={MIN_RANGE}
              max={MAX_RANGE}
              value={filter.rangePrice}
              name="rangePrice"
              onChange={changeFilter}
            />
          </div>
        </div>
        <div className={filterStyles.filterItem}>
          <Button
            description="Apply filters"
            variant="primary"
            onClick={(e: MouseEvent) => {
              onFilter(filter);
              onCloseFilter(e);
            }}
          />
          <Button description="Reset filters" onClick={resetFilter} />
        </div>
      </div>
    </section>
  );
};

export default memo(FilterModal);
