/*jshint esversion:6*/
import babelrc from 'babelrc-rollup';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'source/js/app.js',
  dest:'build/js/bundle.js',
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs(),
    babel(babelrc())
  ],
  format: 'iife',
  useStrict:false,
  moduleName:'cashmesh'
};
