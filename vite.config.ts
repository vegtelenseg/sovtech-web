import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
const reactSvgPlugin = require("vite-plugin-react-svg");
import envCompatible from "vite-plugin-env-compatible";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), reactSvgPlugin(), envCompatible()],
  resolve: {
    alias: [
      {
        find: /^@material-ui\/icons\/(.*)/,
        replacement: "@material-ui/icons/esm/$1",
      },
      {
        find: /^@material-ui\/core\/(.+)/,
        replacement: "@material-ui/core/es/$1",
      },
      {
        find: /^@material-ui\/core$/,
        replacement: "@material-ui/core/es",
      },
    ],
  },
});
