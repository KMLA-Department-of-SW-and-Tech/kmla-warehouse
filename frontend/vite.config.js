import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const isDev = mode === "development";
    
    return {
        plugins: [react()],
        server: {
            proxy: {
                "/api": {
                    target: isDev ? "http://localhost:3000" : "https://kmla-warehouse-backend.netlify.app/api",
                    changeOrigin: true,
                    secure: false,
                    ws: true,
                }
            },
        },
    }
});
