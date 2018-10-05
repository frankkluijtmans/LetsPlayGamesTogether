process.env.STAGE = (process.env.STAGE) ? process.env.STAGE : 'dev';
const debug = process.env.STAGE === 'dev' || process.env.debug === 'true';
const webpack = require('webpack');

let loadPlugins = [];

let babelOptions = {
	"presets": [
		"env"
	]
};

if (!debug) {
	loadPlugins.push(
		new webpack.optimize.UglifyJsPlugin({
			// Eliminate comments
			comments: false,
			// Compression specific options
			compress: {
				// remove warnings
				warnings: false,
				// Drop console statements
				drop_console: true
			},
			parallel: true
		})
	);
}

module.exports = {
	entry: {
		index: './src/index.ts'
	},
	output: {
		path: __dirname + "/dist",
		publicPath: '/dist',
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'babel-loader',
						options: babelOptions
					},
					{
						loader: 'ts-loader'
					}
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: babelOptions
					}
				]
			},
			{
				test: /\.node$/,
				use: 'node-loader'
			}
		]
	},
	resolve: {
		extensions: ['.ts'],
		alias: {
			config: `${__dirname}/src/config/${process.env.STAGE}/config.ts`,
		}
	},
	plugins: loadPlugins,
};