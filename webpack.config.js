const webpack = require('webpack');
const path = require('path');


module.exports = {

    // target: 'node',
    node: {
        __dirname: false,
    },
    entry: './entry/client',
    output: {
        path: path.resolve(__dirname, './publish'),
        filename: 'bundle.js',
        publicPath: '/',
    },

    plugins: process.env.NODE_ENV === 'production' ? [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
    ] : [],

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
                test: /\.(css|scss|sass)$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
                options: {
                    name: '[path][name].[ext]?[hash]',
                },
            },
        ],
    },
    devServer: {
        inline: true,
        port: 8080,
    },
    resolve: {
        fallback: path.join(__dirname, 'node_modules'),
        extensions: ['', '.js', '.jsx', '.json'],
        packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
    },
    resolveLoader: { fallback: path.join(__dirname, 'node_modules') },

};
