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
  {
    name: "custom-rule",
    rules: {
      "no-multiple-empty-lines": [
        "warn",
        {
          max: 1, // 最大连续空行数
          maxEOF: 0, // 文件末尾最大空行数
          maxBOF: 0, // 文件开头最大空行数
        },
      ],
      semi: ["error", "never"], // 不使用分号
      quotes: ["error", "single"], // 使用单引号
    },
  },
];
