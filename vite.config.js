import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/English-Presentation-CyberSecurity/",
  plugins: [react()],
  server: {
    allowedHosts: true,
  },
});
