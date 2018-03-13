const fs = require('fs');
const path = require('path');

module.exports = {

    entry: path.resolve(__dirname, 'entry/server'),

    output: {
        // path: 'publish',
        path: path.resolve(__dirname, './publish'),
        filename: 'server.bundle.js',
        publicPath: '/',
    },
    target: 'node',

  // keep node_module paths out of the bundle
    externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
        'react-dom/server', 'react/addons',
    ]).reduce((ext, mod) => Object.assign({}, ext, { [mod]: `commonjs ${mod}` })),
  // https://stackoverflow.com/questions/41625399/how-to-handle-eslint-no-param-reassign-rule-in-array-prototype-reduce-function
    node: {
        __filename: true,
        __dirname: true,
    },

    module: {
        loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
            {
                test: /\.(jpe?g|png|gif|svg|jpg)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]?[hash]',
                },
            }, {
                test: /\.(css|scss)$/,
                loaders: ['css-loader', 'sass-loader'],
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
