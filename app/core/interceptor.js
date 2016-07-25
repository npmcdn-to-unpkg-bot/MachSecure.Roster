module.exports = angular.module('app.interceptor', []).factory('interceptor', interceptor)
    .config(interceptorConfig);

function interceptor($q, $location){

    return {
        response: function (response) {

            if(response.status === 204){
                $location.path('error');
            }
            return response || $q.when(response);
        },

        responseError: function (rejection) {
            if (rejection.status === 401) {
                $location.path('login');
            }
            if (rejection.status === 500) {
                alert('There was a problem communicating with the server. ' +
                    'Please reload the application and try again. \n If problem persists, please contact IT support.' );
            }
            return $q.reject(rejection);
        }
    };
}

function interceptorConfig ($httpProvider, $locationProvider) {

    //Http interceptor to check auth failures for xhr requests
    $locationProvider.html5Mode({
        enabled: false
    });

    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) { $httpProvider.defaults.headers.get = {}; } // Answer
    // extra
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

    $httpProvider.interceptors.push('interceptor');

}