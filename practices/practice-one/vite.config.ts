import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import environmentPlugin from 'vite-plugin-environment';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    environmentPlugin({
      VITE_URL: process.env.VITE_URL,
    }),
  ],
});
