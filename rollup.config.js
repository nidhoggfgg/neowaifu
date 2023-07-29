import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';

export default [
  {
    input: 'src/main.ts',
    output: [
      {
        file: 'dist/neowaifu.cjs',
        format: 'cjs',
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
    ],
  },
  {
    input: 'src/lazy.ts',
    output: [
      {
        file: 'dist/neowaifu-lazy.min.js',
        format: 'iife',
        sourcemap: true,
      }
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
    plugins: [
      dts(),
      copy({
        targets: [
          { src: 'lapp/core/live2dcubismcore.d.ts', dest: 'dist/' },
          // sample project
          { src: 'dist/*.d.ts', dest: 'sample/src/neowaifu/' },
          { src: 'dist/neowaifu.mjs', dest: 'sample/src/neowaifu/' },
        ]
      })
    ],
  },
]