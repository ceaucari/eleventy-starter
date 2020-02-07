import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import svelte from 'rollup-plugin-svelte'
import { terser } from 'rollup-plugin-terser'

const dev = process.env.NODE_ENV == 'dev'

export default {
  input: 'scripts/_main.js',
  output: {
    sourcemap: false,
    format: 'iife',
    name: 'main',
    file: 'dist/assets/main.bundle.js',
  },
  inlineDynamicImports: true,
  plugins: [
    replace({
      devMode: dev,
    }),
    svelte({
      dev,
    }),
    postcss({
      extract: 'dist/assets/main.bundle.css',
      minimize: !dev,
    }),
    resolve({
      browser: true,
      dedupe: importee =>
        importee === 'svelte' || importee.startsWith('svelte/'),
    }),
    commonjs(),
    !dev && terser(),
  ],
  watch: {
    clearScreen: false,
  },
}
