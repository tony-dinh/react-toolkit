const webpack = require('webpack')
const baseConfig = require('./base.config.js')

const developmentConfig = Object.assign(baseConfig, {
    devtool: 'inline-source-maps',
    plugins: [].concat(baseConfig.plugins, [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'DEBUG': true
        })
    ])
})

module.exports = developmentConfig