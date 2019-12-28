const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    //entry-point -> output -> loaders

    //will start looking for dependencies
    entry: ['babel-polyfill', './src/js/index.js'],
    //where to save or bundle file
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            // this plugin auto copies the src/index.html file into dist/index.html, hence uses in bundle.js 
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    module: {
        rules: [
            {
                //all of the js files, uses this babel loader
                test: /\.js$/,
                //to make things fast
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }


};