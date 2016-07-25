module.exports = function(){
	/*required modules*/
	global.$ = global.jQuery = require('jquery');
	global.Tether = require('tether');
	global.toastr = require('toastr');
	require('sweetalert');
	require('bootstrap');
	require('font-awesome-webpack');
	require('angular');
	require('jquery-ui');
	global.moment = require('moment');
	/*$.fn.size = function(){
		return this.length;
	};
	require('../js/common/gridstack.js');*/
	require('../js/common/masonry.js');
	/*styles*/
	require('../css/styles.scss');
};