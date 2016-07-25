module.exports = angular.module('app.base', []).directive('base', function(){
    return {
        template: require('../../../html/directives/base.html')
    };
});

