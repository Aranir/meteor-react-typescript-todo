var webpack = require('webpack');
var config = require('./webpack.config.client');
var _ = require('lodash');
var devProps = require('./devProps');

var babelQuery = {
    cacheDirectory: true,

    presets: ['es2015', 'react']
    ,
    "plugins": [
        // must be an array with options object as second item
        ["react-transform", {
            // must be an array of objects
            "transforms": [{
                // can be an NPM module name or a local path
                "transform": "react-transform-hmr",
                // see transform docs for "imports" and "locals" dependencies
                "imports": ["react"],
                "locals": ["module"]
            }, {
                // you can have many transforms, not just one
                "transform": "react-transform-catch-errors",
                "imports": ["react", "redbox-react"]
            }]
        }]
    ]
};

var config = module.exports = _.assign(_.clone(config), {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?' + devProps.baseUrl,
        'webpack/hot/only-dev-server',
    ].concat(config.entry),
    output: _.assign(_.clone(config.output), {
        publicPath: devProps.baseUrl + '/assets/',
        pathinfo: true,
        // crossOriginLoading is important since we are running
        // webpack-dev-server from a different port than Meteor
        crossOriginLoading: 'anonymous',
    }),
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'babel?' + JSON.stringify(babelQuery) + '!ts-loader',
            },
            {
                test: /\.jsx?$/,
                loader: 'babel?' + JSON.stringify(babelQuery),
                exclude: /node_modules|lib/,
            },
            {
                test: /\.css$/,
                loader: 'style!css',
                exclude: /node_modules|lib/,
            },
        ],
    },
    plugins: (config.plugins || []).concat([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ]),
    devServer: {
        publicPath: devProps.baseUrl + '/assets/',
        host: devProps.host,
        hot: true,
        historyApiFallback: true,
        contentBase: devProps.contentBase,
        port: devProps.webpackPort,
    }
});
