#!/bin/bash
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"

echo "🗑 Cleaning '/dist'..."
rm -rf $ROOT_DIR/dist
rm -rf $ROOT_DIR/src/vendor

# Copy Vendor Files
mkdir -p $ROOT_DIR/src/vendor/styles/ && cp $ROOT_DIR/node_modules/flatpickr/dist/flatpickr.min.css $ROOT_DIR/src/vendor/styles/

# Transpile Components
./node_modules/.bin/babel src/components -x ".js",".jsx" --ignore "*.test.js","test.js" --out-dir dist/es6/components
NODE_ENV='commonjs' ./node_modules/.bin/babel src/components -x ".js",".jsx" --ignore "*.test.js","test.js" --out-dir dist/commonjs/components

# Copy Components styles
pushd src
rsync -Rv components/**/*.scss $ROOT_DIR/dist/es6
rsync -Rv components/**/*.scss $ROOT_DIR/dist/commonjs

rsync -Rv styles/*.scss $ROOT_DIR/dist/es6
rsync -Rv styles/*.scss $ROOT_DIR/dist/commonjs

rsync -Rv vendor/**/*.* $ROOT_DIR/dist/es6
rsync -Rv vendor/**/*.* $ROOT_DIR/dist/commonjs
popd
