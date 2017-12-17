var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ['./src/main.js', './scss/index.scss'],
    output: {
        filename: "dist/bundle.js"
    },
    module: {

        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename:'dist/[name].bundle.css',
            allChunks: true
        })
    ]
};