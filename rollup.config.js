import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs'
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm'
      },
      {
        file: 'dist/index.min.js',
        format: 'umd',
        name: 'StableFingerprint',
        plugins: [terser()]
      }
    ],
    plugins: [
      babel({
        presets: ['@babel/preset-env']
      })
    ]
  }
];