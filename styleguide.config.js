const ROOT_DIR = process.cwd()
const path = require('path')
const webpackConfig = require('./webpack/develop.config.js')

webpackConfig.entry.push[path.resolve(ROOT_DIR, 'src/styles/_styles.scss')]
module.exports = {
    title: 'React Toolkit',
    serverPort: 4000,
    require: [
        path.resolve(ROOT_DIR, 'src/styles/styles.scss'),
    ],
    webpackConfig: webpackConfig,
    skipComponentsWithoutExample: false,
    previewDelay: 500
}