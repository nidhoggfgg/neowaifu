import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: 'src/main.ts',
    output: [
      {
        file: 'dist/neowaifu.js',
        format: 'iife',
        sourcemap: true,
      },
      {
        file: 'dist/neowaifu.mjs',
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      nodeResolve(),
      commonjs({ include: ['node_modules/localforage/**'] }),
      typescript(),
      terser()
    ],
  },
  {
    input: 'src/main.ts',
    output: {
      file: 'dist/neowaifu.d.ts',
      format: 'es',
    },
    external: ['localforage'],
    plugins: [dts()],
  },
]