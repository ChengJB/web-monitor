import vuePlugin from "eslint-plugin-vue";
import tsPlugin from "typescript-eslint";
// 在最后面新增extends
export default [
  {
    languageOptions: {
      sourceType: "module",
    },
    plugins: {
      vuePlugin,
      tsPlugin,
    },
    ignores: [
      "node_modules/",
      "*.md",
      ".vscode/",
      ".idea/",
      "dist/",
      "/public/",
      "/docs/",
      ".husky/",
      ".local/",
      "/bin/",
    ],
  },
];
