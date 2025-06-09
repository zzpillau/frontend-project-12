import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  stylistic.configs.recommended,
  { files: ['**/*.{js,mjs,cjs,jsx}'], plugins: { js }, extends: ['js/recommended'] },
  { files: ['**/*.{js,mjs,cjs,jsx}'], languageOptions: { globals: globals.browser } },
  pluginReact.configs.flat.recommended,
  { rules: {
    'no-unused-vars': 'warn',
    'react/prop-types': 'off',
  },
  ignores: ['node_modules/**', 'dist/**', 'build/**'] },
])
