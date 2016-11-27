/*jshint esversion:6*/

import scss from 'rollup-plugin-scss';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'source/vue/index.js',
  dest:'build/js/bundle.js',
  plugins: [
    json(),
    scss(),
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
