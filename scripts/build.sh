#!/bin/bash
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"

echo "🗑 Cleaning '/dist'..."
rm -rf $ROOT_DIR/dist

# Transpile Components
./node_modules/.bin/babel src/components -x ".js",".jsx" --ignore "*.test.js","test.js" --out-dir dist/components

# Copy Components styles
pushd src
rsync -Rv components/**/*.scss $ROOT_DIR/dist/
rsync -Rv styles/*.scss $ROOT_DIR/dist/
popd