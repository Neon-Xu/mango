const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: {
        main: './src/main',
        login: './src/login/login',
        password: './src/login/password-find/password-find'
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
                use: [{
                    loader: 'vue-loader'
                },
                {
                    loader: 'iview-loader',
                    options: {
                        prefix: false
                    }
                }]
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env']
                    }
                },
                exclude: [/(node_modules)/, path.resolve(__dirname, 'src/libs/iview')]
            },
            {
                test: /\.css$/i,
                include: [
                    path.resolve(__dirname, './src/styles')
                ],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.css$/i,
                exclude: [
                    path.resolve(__dirname, './src/styles')
                ],
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images'
                    }
                }]
            },
            {
                test: /\.(html|tpl)$/,
                use: [ 'html-loader' ]
            },
            {
                test: /\.less$/,
                use: ['vue-style-loader','css-loader','less-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '@iview': path.join(__dirname, "src/libs/iview/iview.min"),
            '@src': path.join(__dirname, "src"),
            '@views': path.join(__dirname, "src", "views"),
            '@utils': path.join(__dirname, "src", "utils"),
            '@config': path.join(__dirname, "src", "config"),
            '@api': path.join(__dirname, "src", "api"),
            '@cmp': path.join(__dirname, "src", "components")
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                ccss: {
                    name: 'ccss',
                    priority: 12,
                    chunks: 'all',
                    enforce: true,
                    test: /\.css$/i
                },
                vendors: {
                    name: 'vendors',
                    priority: 9,
                    chunks: 'initial',
                    minChunks : 3,
                    test: /\.js$/
                },
                highcharts: {
                    name: 'highcharts',
                    priority: 11,
                    chunks: 'all',
                    test: /[\/\]node_modules[\/\\](highcharts)/
                },
                hls: {
                    name: 'hls',
                    priority: 11,
                    chunks: 'all',
                    test: /[\/\]node_modules[\/\\](hls\.js)/
                },
                
            }
        },
        runtimeChunk: {
            name: 'runtime'
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css'
        }),       
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/templates/index.ejs',
            chunks: ['runtime','vendors', 'main', 'ccss'],
            favicon: './favicon.ico'
        }),
        new HtmlWebpackPlugin({
            filename: './login.html',
            template: './src/templates/login.ejs',
            chunks: ['runtime', 'vendors', 'login', 'ccss'],
            favicon: './favicon.ico'
        }),
        new HtmlWebpackPlugin({
            filename: './password-find.html',
            template: './src/templates/password.ejs',
            chunks: ['runtime','vendors','password', 'ccss'],
            favicon: './favicon.ico'
        }),
        new CopyWebpackPlugin([{
            from: './static/',
            to: 'static/',
            toType: 'dir'
        }]),
        new CopyWebpackPlugin([{
            from: './src/styles/iview/',
            to: 'styles/iview/',
            toType: 'dir'
        }])
        
    ]
};
