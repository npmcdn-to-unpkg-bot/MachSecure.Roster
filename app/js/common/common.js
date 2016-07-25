/*global toastr: true*/
module.exports = angular.module('app.common', [])
    .factory('common',  common)
    .provider('commonConfig', function () {
        this.config = {};

        this.$get = function () {
            return {
                config: this.config
            };
        };
    });

function common($q, $rootScope, commonConfig) {
    function activateController(promises, controller) {
        return $q.all(promises).then(eventArgs => {
            const data = { controller: controller };
            $broadcast(commonConfig.config.controllerActivateSuccessEvent, data);
        });
    }

    function logger(type,title, message)
    {
        toastr.options = {
            'progressBar': false,
            'positionClass': 'toast-bottom-left',
            'closeButton': true,
            'newestOnTop': true,
            'preventDuplicates': true,
            'showDuration': '300',
            'hideDuration': '1000',
            'timeOut': 2000,
            'extendedTimeOut': 0,
            'showEasing': 'swing',
            'hideEasing': 'linear',
            'showMethod': 'fadeIn',
            'hideMethod': 'fadeOut'
        };

        switch(type){
            case 'success': toastr.success(message, title);
                break;
            case 'info': toastr.info(message, title);
                break;
            case 'error': toastr.error(message, title);
                break;
            case 'warning': toastr.warning(message, title);
                break;
        }
    }

    function $broadcast() {
        return $rootScope.$broadcast.apply($rootScope, arguments);
    }
    return {
        $broadcast: $broadcast,
        $q: $q,
        activateController: activateController,
        logger: logger
    };
}