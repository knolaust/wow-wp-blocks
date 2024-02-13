const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');

// Import the preparePhpFile function correctly
const { modifyPhpEnqueuePaths } = require('./preparePhpFile.js');

module.exports = {
    entry: {
        'wow-wp-blocks': ['./assets/js/wow-wp-blocks.js', 'wowjs', 'animate.css'],
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].min.css',
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!wow-wp-blocks.php'], // Exclude wow-wp-blocks.php from cleaning
        }),
        new WebpackBar({
            name: 'errors-only', // Display errors only
        }),
        // Ensure modifyPhpEnqueuePaths is called correctly
        function() {
            this.hooks.beforeCompile.tap('PreparePhpFilePlugin', () => {
                modifyPhpEnqueuePaths();
            });
        },
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    optimization: {
        minimizer: [
            new TerserPlugin(), // Minify JS
            new CssMinimizerPlugin(), // Minify CSS
        ],
    },
    resolve: {
        alias: {
            'wowjs': path.resolve(__dirname, 'node_modules/wowjs/dist/wow.min.js'),
            'animate.css': path.resolve(__dirname, 'node_modules/animate.css/animate.min.css'),
        },
    },
};
