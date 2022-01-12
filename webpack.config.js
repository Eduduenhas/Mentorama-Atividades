const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			minify: false
		})
	],
	module: {
		rules: [
			{
				test: /\.(sass|css)$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
}