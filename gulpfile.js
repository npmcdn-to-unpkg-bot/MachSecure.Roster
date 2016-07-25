var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackDev = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");

gulp.task("web-dev", function(callback){
	var myConfig = Object.create(webpackConfig);
	myConfig.devtool = "eval";
	myConfig.debug = true;
	myConfig.dev = true;

	new webpackDev(webpack(myConfig), {
		stats: {
			colors: true
		},
		historyApiFallback: true,
		proxy: {
			"*": "http://localhost:10000"
		}
	}).listen(3000, "localhost", function(err){
		if (err) throw new gutil.PluginError("web-dev", err);
		gutil.log("[web-dev]", "http://localhost:3000");
	})
});

gulp.task("web-prod", function(callback){
	var myConfig = Object.create(webpackConfig);
	myConfig.dev = false;
	webpack(myConfig,  function(err,stats){
		if(err) throw new gutil.PluginError("webpack", err);
		gutil.log("[webpack]", stats.toString())
	});
	callback();


});