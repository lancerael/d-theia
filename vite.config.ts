/// <reference types="vitest" />
import { defineConfig, UserConfig } from 'vite'

import type { InlineConfig } from 'vitest'

interface VitestConfigExport extends UserConfig {
  test: InlineConfig
}

export default defineConfig({
  base: './',
  test: {
    globals: true,
    watch: false,
    environment: 'jsdom',
    setupFiles: ['./node_modules/@pi-lib/config/vitest-setup.ts'],
    coverage: {
      provider: 'istanbul',
    },
  },
  build: process.env.BUILD_TASK
    ? {
        lib: {
          entry: './src/index.ts',
          formats: ['es'],
          name: 'd-theia',
          fileName: 'index',
        },
        outDir: 'vanilla',
        minify: 'terser',
      }
    : {},
} as VitestConfigExport)
