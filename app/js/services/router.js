module.exports = angular.module('app.routing', []).provider('router', function ($stateProvider) {

    var urlCollection;

    this.$get = function ($http, $state) {
        return {
            setUpRoutes: function () {
                var collection = require('../directives/sidebar/sidebar.json');
                for (var routeName in collection) {
                    if (collection.hasOwnProperty(routeName)) {
                        if (!$state.get(routeName)) {

                            var c = collection[routeName];

                            $stateProvider.state(
                                c.name, {
                                    url: c.url,
                                    template: require('../../html/views/' + c.name.toLowerCase() + '.html'),
                                    controller: require('../controllers/' + c.name.toLowerCase() + '.js'),
                                    controllerAs: c.controllerAs
                                }
                            );
                        }
                    }
                }
            }
        };
    };


    this.setCollectionUrl = function (url) {
        urlCollection = url;
    };
})

    .config(function ($stateProvider, $urlRouterProvider, routerProvider) {

        $urlRouterProvider.otherwise('/');

        routerProvider.setCollectionUrl('../js/directives/sidebar/sidebar.json');
    }
)
    .controller('MainController', function ($scope, router) {
        $scope.reload = function () {
            router.setUpRoutes();
        };
    })

    .run(function (router) {
        router.setUpRoutes();
    });