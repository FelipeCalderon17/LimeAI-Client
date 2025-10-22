import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [
    react({
      tsDecorators: true,
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/presentation/component"),
      "@pages": path.resolve(__dirname, "./src/presentation/page"),
      "@services": path.resolve(
        __dirname,
        "./src/infrastructure/adapter/api/service"
      ),
      "@hooks": path.resolve(__dirname, "./src/presentation/hooks"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@domain": path.resolve(__dirname, "./src/domain"),
      "@gateway": path.resolve(__dirname, "./src/domain/gateway"),
      "@model": path.resolve(__dirname, "./src/domain/model"),
      "@use-case": path.resolve(__dirname, "./src/domain/use-case"),
      "@infrastructure": path.resolve(__dirname, "./src/infrastructure"),
      "@presentation": path.resolve(__dirname, "./src/presentation"),
    },
  },
});
