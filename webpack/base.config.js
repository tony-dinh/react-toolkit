const webpack = require('webpack')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

const ROOT_DIR = process.cwd()
const entryPath = path.resolve(ROOT_DIR, 'src/main.jsx')
const outputPath = path.resolve(ROOT_DIR, 'build')

const config = {
    entry: [
        entryPath
    ],
    output: {
        filename: '[name].js',
        path: outputPath
    },
    resolve: {
        alias: {
            components: path.resolve(ROOT_DIR, 'dist/components')
        },
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js(x?)$/,
                exclude: /node_modules/,
                options: {
                    cacheDirectory: `${__dirname}/tmp`
                }
            },
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new CopyPlugin([
            {from: path.resolve(ROOT_DIR, 'src/static'), to: outputPath},
        ])
    ]
}

module.exports = config