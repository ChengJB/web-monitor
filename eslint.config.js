import vuePlugin from 'eslint-plugin-vue'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import prettierPlugin from 'eslint-plugin-prettier'
import tsParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser' // 新增 Vue 解析器

export default [
	{
		files: ['**/*.{js,ts,vue}'],
		// 关键修正：直接指定解析器
		languageOptions: {
			parser: vueParser, // Vue 文件主解析器
			parserOptions: {
				parser: {
					ts: tsParser, // 处理 <script lang="ts"> 区块
					js: '@typescript-eslint/parser' // 统一 JS 解析器
				},
				project: './tsconfig.json',
				extraFileExtensions: ['.vue'] // 允许解析 Vue 文件中的 TS
			},
			sourceType: 'module'
		},
		plugins: {
			vue: vuePlugin,
			'@typescript-eslint': tsPlugin,
			prettier: prettierPlugin
		},
		ignores: [
			/* 保持原有忽略配置 */
		],
		rules: {
			// 替换为 TS 专用规则
			'@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_' }],
			'no-unused-vars': 'off', // 关闭基础规则

			// 其他规则保持原样
			'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 0, maxBOF: 0 }],
			semi: ['error', 'never'],
			quotes: ['error', 'single']
		}
	},
	{
		files: ['**/*.vue'],
		rules: {
			'vue/multi-word-component-names': 'off',
			// 添加 Vue+TS 组合规则
			'vue/script-setup-uses-vars': 'error'
		}
	}
]
