import { useCallback } from 'react';
import { useApp } from './useApp';
import { AxiosError } from 'axios';

/**
 * This hook is used to interact with localStorage
 * @returns Methods to interact with localStorage
 */
export const useStore = () => {
  const { onShowToast } = useApp();

  /**
   * Get data in store
   * @param key Key to get in localStorage
   * @returns {T | undefined} Value to get when found and undefine when not found
   */
  const get = useCallback(
    <T>(key: string): T | undefined => {
      try {
        const isValue = localStorage.getItem(key);

        if (!isValue) {
          return;
        }

        const value = JSON.parse(isValue);

        return value;
      } catch (error) {
        const { message } = error as AxiosError;

        onShowToast({
          message,
          type: 'error',
          display: 'visible',
        });
      }
    },
    [onShowToast]
  );

  /**
   * Add data to localStorage
   * @param key Keys to save
   * @param value Value to save to localStorage
   */
  const set = useCallback(
    <T = any>(key: string, value: T) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        const { message } = error as AxiosError;

        onShowToast({
          message,
          type: 'error',
          display: 'visible',
        });
      }
    },
    [onShowToast]
  );

  /**
   * Delete a key contained in localStorage
   * @param key Key to delete
   */
  const remove = useCallback(
    (key: string) => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        const { message } = error as AxiosError;

        onShowToast({
          message,
          type: 'error',
          display: 'visible',
        });
      }
    },
    [onShowToast]
  );

  return { get, set, remove };
};
