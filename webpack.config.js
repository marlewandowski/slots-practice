const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/code/index.ts',
    mode: "development",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'game.bundle.js'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'), 
          },
        compress: true,
        port: 9000
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    devtool: "source-map",
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets' },
                { from: 'src/code/style.css', to: 'style.css' }, 
            ],
        }),
        new HtmlWebpackPlugin({
            title: 'PixiGame',
            template: './src/code/index.ejs'
        })
    ]
};
