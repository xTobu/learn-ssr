import webpack from 'webpack';

const path = require('path');

module.exports = {
    target: 'node',
    node: {
        __dirname: true,
    },
    entry: [
        './entry/client/',
    ],
    output: {
        path: `${__dirname}/`,
        filename: 'bundle.js',
        publicPath: '/publish/',
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx$|\.js$/,
                loader: 'eslint-loader',
                include: `${__dirname}/app`,
                exclude: /bundle\.js$/,
            },
        ],
        loaders: [
            {
                test: /\.jsx?$/,         // Match both .js and .jsx files
                exclude: /node_modules/,
                loader: 'babel-loader',

            },
            {
                test: /\.(jpe?g|png|gif|svg|jpg)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]?[hash]',
                },
            }, {
                test: /\.(css|scss)$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
                options: {
                    name: '[path][name].[ext]?[hash]',
                },
            },
        ],
    },
    resolve: {
        fallback: path.join(__dirname, 'node_modules'),
        extensions: ['', '.js', '.jsx', '.json'],
        packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
    },
    resolveLoader: { fallback: path.join(__dirname, 'node_modules') },
};
