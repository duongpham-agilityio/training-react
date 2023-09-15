import { ChangeEvent, useCallback, useRef } from 'react';

// Constants
import { TIMEOUT_DEBOUNCE } from '@constants';

/* eslint-disable no-unused-vars */
type DebounceProps = (value: string) => void;

/**
 * - This is a custom hook that listens for user input
 * @param callback Have a string as parameter
 * @returns
 */
export const useDebounce = (callback: DebounceProps) => {
  const refTime = useRef<ReturnType<typeof setTimeout>>();

  const debounce = useCallback((event: ChangeEvent) => {
    const element = event.target as HTMLInputElement;
    const value = element.value;

    if (refTime.current) clearTimeout(refTime.current);
    refTime.current = setTimeout(() => {
      callback(value);
    }, TIMEOUT_DEBOUNCE);
  }, []);

  return debounce;
};
