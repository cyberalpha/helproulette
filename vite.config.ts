
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      // Add any CSS preprocessor options if needed
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    force: true 
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      // Configure rollup options if needed
    }
  }
}));
