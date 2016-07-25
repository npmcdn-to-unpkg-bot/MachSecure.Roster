'use strict';
var webpack = require('webpack'),
	APP = __dirname;
var dev = false;
var path = require('path');

var extract = require("extract-text-webpack-plugin");

module.exports = {
	context: APP,
	entry: {
		app: dev === false ?  './app/core/entry.js' : ['webpack/hot/dev-server', './app/core/entry.js']
	},
	output: {
		path: APP,
		filename: 'build/bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel', query: {cacheDirectory: true, presets: ['es2015']},exclude: /node_modules/ },
			{ test: /\.css$/, loader: 'style-loader!css-loader' },
			{ test: /\.scss$/, loader: "style-loader!css-loader!sass-loader?" },
			{ test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
			{ test: /\.html/, loader: 'raw' },
			{ test: /\.json/, loader: 'json' },
			{ test: /\.ico$/, loader: 'url-loader?mimetype=image/ico' },
			{ test: /\.(jpg|png)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?name=img/[name].[ext]' },
			{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?name=fonts/[name].[ext]&limit=10000&minetype=application/font-woff" },
			{ test: /\.(ttf|eot|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=fonts/[name].[ext]" }
		]
	},

	resolve: {
		root: APP,
		alias: {
			sweetalert: '../../node_modules/sweetalert/dist/sweetalert.min.js',
			'jquery-ui/resizable': 'jquery-ui/ui/widgets/resizable',
			'jquery-ui/draggable': 'jquery-ui/ui/widgets/draggable',
			'jquery-ui/mouse': 'jquery-ui/ui/widgets/mouse',
			'jquery-ui/core': 'jquery-ui/ui/core',
			'jquery-ui/widget': 'jquery-ui/ui/widget'
		}
	},
	plugins: !dev ?
		[
			//   new webpack.HotModuleReplacementPlugin(),
			new webpack.optimize.UglifyJsPlugin({minimize: true, mangle: false})
		] :
		[
			new webpack.HotModuleReplacementPlugin()
		]
};