import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: {},
  },
  server: { https: true, origin: 'https://backlog-app.localhost.com:8080' },
  plugins: [react(), tsconfigPaths(), mkcert()]
});
