import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  sourcemap: true,
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
  minify: true,
  target: 'es2020',
  outDir: 'dist',
  platform: 'neutral',
  external: ['zod', 'yup'],
});
