/// <reference types="vitest" />
import { defineConfig, UserConfig } from 'vite'

import type { InlineConfig } from 'vitest'

import { terser } from 'rollup-plugin-terser'

interface VitestConfigExport extends UserConfig {
  test: InlineConfig
}

export default defineConfig({
  test: {
    globals: true,
    watch: false,
    environment: 'jsdom',
    setupFiles: ['./node_modules/@pi-lib/config/vitest-setup.ts'],
    coverage: {
      provider: 'istanbul',
    },
  },
  build: {
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
      name: 'd-theia',
      fileName: 'index',
    },
    outDir: 'vanilla',
    minify: 'terser',
  },
  plugins: [
    terser({
      compress: {
        defaults: false,
        drop_console: true,
      },
      mangle: {
        eval: true,
        module: true,
        toplevel: true,
        safari10: true,
        properties: false,
      },
      output: {
        comments: false,
      },
    }),
  ],
} as VitestConfigExport)
