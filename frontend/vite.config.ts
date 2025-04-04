import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss(),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  server: {
    host: '0.0.0.0', // Разрешить доступ с любого IP
    port: 5173,      // Порт сервера разработки
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0', 
    port: 4173,   
    allowedHosts: ["wordlik.loca.lt", "frontend"],

  },

});