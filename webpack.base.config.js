const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');


module.exports = {
    entry: {
        main: './src/main',
        vendors: './src/vendors',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: 'scripts/[name].[hash].js',
        chunkFilename: 'scripts/[name].[hash].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                css: ExtractTextPlugin.extract({
                                    use: ['css-loader?minimize', 'postcss-loader'],
                                    fallback: 'vue-style-loader' 
                                })
                            }
                        }
                    },
                    {
                        loader: 'iview-loader',
                        options: {
                            prefix: false
                        }
                    }
                ]
            },
            {
                test: /iview\/.*?js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?minimize', 'postcss-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images'
                        }  
                    }
                ]
            },
            {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            '@views':  path.join(__dirname, "src", "views")
        }
    },
    plugins: [
        new WebpackCleanupPlugin(),
        new ExtractTextPlugin('styles/[name].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'scripts/vendors.js',
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './src/templates/index.ejs',
            inject: true,
            chunks: ['main','vendors']
        }),
    ]
};