const ROOT_DIR = process.cwd()
const path = require('path')
const webpackConfig = require('./webpack/develop.config.js')
const package = require('./package.json')

webpackConfig.entry.push[path.resolve(ROOT_DIR, 'src/styles/_styles.scss')]
module.exports = {
    title: `React Toolkit v${package.version}`,
    serverPort: 4000,
    require: [
        path.resolve(ROOT_DIR, 'src/styles/styles.scss'),
    ],
    webpackConfig: webpackConfig,
    ignore: ['**/partials/**/*.{js,jsx}', '**/__tests__/**', '**/*.test.js', '**/*.test.jsx', '**/*.spec.js', '**/*.spec.jsx'],
    styleguideDir: path.resolve(ROOT_DIR, 'docs'),
    skipComponentsWithoutExample: false,
    previewDelay: 500
}