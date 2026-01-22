import { defineConfig, mergeConfig } from 'vitest/config'
import baseConfig from './vitest.config'

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      environment: 'happy-dom',
      include: ['tests/happy-dom/**/*.spec.js']
    }
  })
)
