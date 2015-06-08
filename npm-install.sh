#!/usr/bin/env bash
echo "Building custom lodash module..."

mkdir -p node_modules/lodash

node_modules/.bin/lodash \
  include=contains,difference,each,isEmpty,extend,flatten,keys,values,isNaN,isObject,isArray \
  exports=node \
  -d -o node_modules/lodash/index.js

echo "Done."
