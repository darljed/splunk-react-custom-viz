var webpack = require('webpack');
var path = require('path');

module.exports = {
    // Defines the entry point for your webpack bundle.
    entry: './src/visualization_source.js',

    // Configuration for how modules are resolved.
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules'
        ],
        extensions: ['.js', '.jsx']
    },

    // Configuration for source maps to aid debugging in development.
    // 'source-map' is a good balance between detail and build time.
    devtool: 'source-map', 

    // Output configuration for the bundled file.
    output: {
        path: __dirname,
        filename: 'visualization.js',
        libraryTarget: 'amd'
    },

    // Defines external dependencies that should not be bundled by webpack.
    externals: [
        'api/SplunkVisualizationBase',
        'api/SplunkVisualizationUtils'
    ],

    // Module rules define how different types of modules are treated.
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};
