const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },

    module: {
        rules:[
            {
                test: /\.html$/,
                use: [
                    'html-loader',
                ]
            },{
                test: /\.css|scss$/,
                use: [{
                    loader: 'style-loader'
                },{
                    loader: 'css-loader'
                },{
                    loader: 'postcss-loader'
                },{
                    loader: 'sass-loader'
                }]
            },{
                test: /\.js$/,
                exclude: /(node_module)|(bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['ES2015'],
                    plugins: [],
                }
            },{
                test: /\.jpg|png|gif|svg$/,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 10,
                            },
                            optipng: {
                                enable: false,
                            },
                            pngquant: {
                                quality: 10,
                                speed: 1,
                            },
                            svgo: {
                                quality: 10,
                            },
                        }
                    }
                ]
            }
        ]
    },

    devServer: {
        compress: true,
        port: 8080,
        hot: true,
    },

    plugins: [
        new CleanWebpackPlugin(['public']),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })

    ]

};
