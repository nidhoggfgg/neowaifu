// import dts from 'rollup-plugin-dts';
// import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/neowaifu.js',
        format: 'es',
        // sourcemap: true,
      },
    ],
    plugins: [
      commonjs(),
      typescript()
    ],
  },
]
