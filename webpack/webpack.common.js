const webpack = require("webpack");
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { isYieldExpression } = require("typescript");
const srcDir = '../src/';

module.exports = {
    entry: {
        popup: path.join(__dirname, srcDir + 'popup.tsx'),
    },
    output: {
        path: path.join(__dirname, '../dist/js'),
        filename: '[name].js'
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: "initial"
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new CopyPlugin({
            patterns: [
                { from: 'public', to: '../' }
            ]
        }),
    ]
};