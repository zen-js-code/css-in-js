'use strict';

const PATH = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT = '.';

const CACHE_DIR = PATH.resolve(__dirname, ROOT, '.cache/');
const NODE_MODULES = PATH.resolve(__dirname, ROOT, 'node_modules/');

const SRC_DIR = PATH.resolve(__dirname, ROOT, 'src/');
const INDEX_JS_FILE = PATH.resolve(SRC_DIR, 'index.js');
const INDEX_HTML_FILE = PATH.resolve(SRC_DIR, 'index.html');

const JS_DIR = 'js';
const PUBLIC_PATH = `/${JS_DIR}/`;

const PUBLIC_DIR = PATH.resolve(__dirname, ROOT, 'dist/');
const JS_ASSETS_DIR =  PATH.resolve(PUBLIC_DIR, `${JS_DIR}/`);

const config = {
    entry: {
        app: [
            'react-hot-loader/patch',
            INDEX_JS_FILE
        ]
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[id].js',
        path: JS_ASSETS_DIR,
        publicPath: PUBLIC_PATH
    },
    cache: true,
    devtool: 'source-map',
    devServer: {
        stats: 'minimal',
        clientLogLevel: 'warning',
        port: 3030,
        contentBase: PUBLIC_DIR,
        publicPath: PUBLIC_PATH,
        compress: true,
        watchOptions: {
            ignored: [NODE_MODULES]
        },
        historyApiFallback: true,
        watchContentBase: true,
        overlay: {
            warnings: false,
            errors: true
        }
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            hash: false,
            filename: '../index.html',
            cache: true,
            inject: true,
            template: INDEX_HTML_FILE
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: SRC_DIR,
                exclude: [NODE_MODULES],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: CACHE_DIR
                    }
                }]
            }
        ]
    }
};

module.exports = config;
