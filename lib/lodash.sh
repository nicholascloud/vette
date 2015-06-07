#!/usr/bin/env bash
../node_modules/.bin/lodash \
  include=contains,difference,each,isEmpty,extend,flatten,keys,values,isNumber,isObject,isArray \
  exports=node \
  -d -o lodash.js
