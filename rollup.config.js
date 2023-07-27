import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/lapp.ts',
    output: [
      {
        file: 'dist/neowaifu.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/neowaifu.mjs',
        format: 'es',
        sourcemap: true,
      },
    ],
    external: ['localforage'],
    plugins: [typescript()],
  },
  {
    input: 'src/lapp.ts',
    output: {
      file: 'dist/neowaifu.d.ts',
      format: 'es',
    },
    external: ['localforage'],
    plugins: [dts()],
  },
]