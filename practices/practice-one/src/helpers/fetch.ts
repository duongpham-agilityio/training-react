import axios from 'axios';

/**
 * Configuration axios
 */
export const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_URL,
});

export const fetcher = (endpoint: string) => {
  return axiosConfig.get(endpoint).then((res) => res.data);
};
