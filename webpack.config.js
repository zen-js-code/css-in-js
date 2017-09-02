'use strict';

const PATH = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
const DEV = (['build'].indexOf(TARGET) < 0);

console.log(`Running in ${DEV ? 'development' : 'production'} mode...`);

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

const BASE_CONFIG = {
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
    devtool: 'cheap-module-eval-source-map',
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
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].js',
            minChunks: (module) => {
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
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

const PROD_CONFIG = {
    output: {
        filename: '[name]-[chunkhash].js',
        chunkFilename: '[id]-[chunkhash].js'
    },
    devtool: false,
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name]-[chunkhash].js'
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'async'
        }),
        new CleanWebpackPlugin([PUBLIC_DIR]),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new UglifyJsPlugin({extractComments: true}),
        new OptimizeJsPlugin({sourceMap: false}),
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
};

const config = !DEV ? merge({}, BASE_CONFIG, PROD_CONFIG) : BASE_CONFIG;

module.exports = config;
