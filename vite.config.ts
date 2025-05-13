
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: [
      "localhost", 
      "f177f8a0-0045-476d-bad6-ffe320ee0786.lovableproject.com"
    ],
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
    modules: {
      scopeBehaviour: 'local',
    },
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
    },
    minify: mode === 'production' ? 'terser' : false, // Only use terser in production
    terserOptions: {
      compress: {
        drop_console: false,
      },
    },
  }
}));
