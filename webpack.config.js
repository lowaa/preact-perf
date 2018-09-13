const path = require('path');
const webpack = require('webpack');

const ROOT = path.resolve( __dirname, 'src' );
const DESTINATION = path.resolve( __dirname, 'dist' );

module.exports = {
    context: ROOT,

    entry: {
        'main': './preact_main.tsx'
    },
    
    output: {
        filename: '[name].bundle.js',
        path: DESTINATION
    },

    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
        modules: [
            ROOT,
            'node_modules'
        ]
    },

    module: {
        rules: [
            /****************
            * PRE-LOADERS
            *****************/
            {
                enforce: 'pre',
                test: /\.js$/,
                use: 'source-map-loader'
            },
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: 'tslint-loader'
            },

            /****************
            * LOADERS
            *****************/
            // awesome-typescript-loader
            // {
            //     test: /\.tsx?$/,
            //     exclude: [ /node_modules/ ],
            //     use: 'awesome-typescript-loader'
            // }

            // ts-loader
            {
                test: /(\.jsx?$|\.tsx?$)/,
                exclude: [/node_modules/],
                use: {
                    loader: 'ts-loader',
                    options: {
                        // transpile our typescript into es6-ish stuff (defined by the tsconfig.compileOptions.target)
                        transpileOnly: true
                    }
                }
            },
        ]
    },

    devtool: 'cheap-module-source-map',
    devServer: {
        hot: false,
        open: false
    }
};

