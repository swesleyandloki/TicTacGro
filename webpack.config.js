var webpack = require('webpack');
var htmlPlugin = require('html-webpack-plugin');

var options = {
	output: {
		filename: 'bundle.js'
	},
	plugins: [
		new htmlPlugin({
			title: 'TicTacGro',
			filename: 'index.html',
			template: 'client/index.html'
		})
	],
	module: {
		loaders: [
			{
			    test:   /\.html/,
			    loader: 'html',
			}
		] 
	}
};
module.exports = options;