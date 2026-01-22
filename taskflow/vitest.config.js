import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./tests/setup.js'],
      include: ['tests/**/*.spec.js'],
      exclude: ['tests/happy-dom/**/*.spec.js'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        include: ['src/**/*.{js,vue}'],
        exclude: [
          'src/main.js',
          'src/**/*.spec.js',
          'src/**/__mocks__/**'
        ],
        thresholds: {
          lines: 80,
          functions: 80,
          branches: 80,
          statements: 80
        }
      }
    }
  })
)
