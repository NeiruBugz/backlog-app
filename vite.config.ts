import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import mkcert from 'vite-plugin-mkcert';

const port = process.env.PLAYWRIGHT ? 4000 : 3000;


// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: true,
  },
  server: {
    https: true,
    port,
  },
  plugins: [react(), tsconfigPaths(), mkcert()]
});
