const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const parsedEnv = require('dotenv').config().parsed;


const clientConfig = {
    entry: "index.tsx",
    mode: "development",
    output: {
        filename: 'client.bundle.js',
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        modules: [__dirname, "src/client", "node_modules"],
        extensions: ["*", ".js", ".jsx", ".tsx", ".ts", ".scss"],
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.scss$/i,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                exclude: /node_modules/,
                use: ["file-loader"]
            },
        ],
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 200,
        poll: 1000,
        ignored: /node_modules/,
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(parsedEnv)
        })
    ],
};

const serverConfig = {
    entry: 'server.tsx',
    target: "node",
    devtool: "source-map",
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.bundle.js',
        clean: true
    },
    resolve: {
        modules: [__dirname, "src", "node_modules"],
        extensions: ["*", ".js", ".jsx", ".tsx", ".ts", ".scss"],
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.scss$/i,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                exclude: /node_modules/,
                use: ["file-loader"]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(parsedEnv)
        })
    ]
};

module.exports = [clientConfig, serverConfig];
