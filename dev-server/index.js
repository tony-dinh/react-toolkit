const fs = require('fs')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('../webpack/develop.config.js')
const compiler = webpack(config)

const port = process.env.PORT || 3000

const server = new WebpackDevServer(compiler, {
    historyApiFallback: true,
    stats: {
        // Configures logging: https://webpack.github.io/docs/node.js-api.html#stats
        assets: false,
        colors: true,
        version: false,
        hash: false,
        chunks: true,
        chunkModules: false,

    }
})

server.listen(port, (err) => {
    console.log(`listening on port ${port}`)
})
