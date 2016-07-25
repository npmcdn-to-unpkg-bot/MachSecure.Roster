module.exports = angular.module('app', [
    require('angular-ui-router'),
    require('angular-loading-bar'),
    require('./js/services/router').name,
    require('./js/common/common').name,
    require('./core/interceptor').name,
    require('./js/services/datacontext').name,
    require('./js/directives/sidebar/sidebar').name,
    require('./js/directives/base/base').name
])
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.latencyThreshold = 0;
    }]);