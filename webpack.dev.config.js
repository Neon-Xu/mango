const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
fs.open('./src/config/env.js', 'w', function (err, fd) {
    const buf = 'export default "development";';
    fs.write(fd, buf, function (err, written, buffer){});
});


module.exports = merge(webpackBaseConfig, {
    devtool: 'source-map',
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        inline: true,
        hot: true, 
        compress: true,
        open: true,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://192.168.2.137:8080',
                changeOrigin: false, 
                pathRewrite: {
                    '^/api': ''
                }
            }

        }
    }
});