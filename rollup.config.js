import commonjs from 'rollup-plugin-commonjs';
import nodeGlobals from 'rollup-plugin-node-globals';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

export default {
  entry: 'src/index.js',
  format: 'umd',
  moduleName: 'Auth0',
  moduleId: 'auth0',
  dest: 'build/auth0.js',
  plugins: [
    nodeResolve({
      jsnext: true,
      browser: true
    }),
    commonjs(),
    nodeGlobals(),
    // HACK: Workaround to *not* make `var context = this` equal to undefined
    // https://github.com/ded/reqwest/blob/c434cf6dac2f8d3efe5491c73dce36b4cabc1521/reqwest.js#L13
    replace({
      delimiters: ['var context = ', ''],
      include: 'node_modules/reqwest/reqwest.js',
      values: {
        this: `var context = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {}`
      }
    })
  ]
};
