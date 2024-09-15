import babel from 'rollup-plugin-babel';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

export default [
  {
    input: 'src/scrollTrackerUtility.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs' // CommonJS for non-React
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm' // ES Module
      },
      {
        file: 'dist/index.umd.js',
        format: 'umd',
        name: 'ScrollTracker'
      }
    ],
    plugins: [typescript(), babel(), terser()]
  },
  {
    input: 'src/ScrollTrackerComponent.tsx',
    output: {
      file: 'dist/react.js',
      format: 'esm',
      name: 'ScrollTracker'
    },
    external: ['react', 'react-dom','prop-types'],
    plugins: [
      postcss({
        modules: true,
        extract: false,
        minimize: true
      }),
      typescript(),
      babel({
        extensions: ['.js', '.ts', '.tsx'], // Ensure .tsx files are transpiled
        presets: [
          '@babel/preset-env',
          '@babel/preset-react', // Important for JSX
          '@babel/preset-typescript',
        ]
      }),
      terser({
        output: {
          beautify: false,  // Keep the output minified but syntactically correct
          preamble: "/* @appility/scrolltracker v1.0.0 */",
          quote_keys: false,  // Don't quote object keys unnecessarily
        },
        compress: {
          unused: true,  // Remove unused variables
          sequences: false,  // Prevent combining expressions with commas
          conditionals: false,  // Avoid turning if-else into conditional expressions
          comparisons: false,  // Disable some aggressive optimizations
        },
        mangle: true,  // Minify variable names
      }) // Optional, for minification
    ]
  }
];
