const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');

const fs = require('fs');

fs.open('./src/config/env.js', 'w', function (err, fd) {
    const buf = 'export default "production";';
    fs.write(fd, buf, function (err, written, buffer){});
});

module.exports = merge(webpackBaseConfig, {
    mode: 'production'
});