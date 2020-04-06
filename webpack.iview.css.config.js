const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, './src/libs/iview/styles/index'),
    output: {
        path: path.resolve(__dirname, './src/styles/iview'),
        filename: 'iview.css.js'
    },
    module: {
        rules: [

            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader"
                    }, 
                    {
                        loader: "less-loader"
                    }
                ]                
            },
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'iconfont'
                        }  
                    }
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'iview.min.css'
        })
    ]
};