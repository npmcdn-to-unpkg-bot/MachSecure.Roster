module.exports = angular.module('app.datacontext', []).factory('datacontext',   datacontext);
var url = 'http://localhost:10000/';

function datacontext($http){

	function test(){
		return $http.get(url + 'test').then(_onSuccess);
	}

	function getLocations(userID){
		return $http.get(url + 'api/userLocations/' + userID).then(_onSuccess);
	}

	function getTiles(userID, contactRoleID){
		return $http.get(url + 'api/userTiles/' + userID + '/' + contactRoleID).then(_onSuccess);
	}

	function getTileDetails(tile, userID, contactRoleID){
		return $http.post(
			'api/userTiles/' + tile,
			{
				userID: userID,
				roleID: contactRoleID
			}
		);
	}

	function getClockingsTile(userID, contactRoleID){
		return $http.get(url + 'api/userTiles/clockings/' + userID + '/' + contactRoleID).then(_onSuccess);
	}

    function userLogin(user){
        return $http.post('api/login', user).then(_onSuccess);
    }

    function logout(){
        return $http.get('api/logout').then(_onSuccess);
    }

    function getUser(){
        return $http.get('api/user').then(_onSuccess);
    }

    function _onSuccess(data){
        return data.data;
    }

    return {
    	test: test,
    	getLocations: getLocations,
		getTiles: getTiles,
		getTileDetails: getTileDetails,
		getClockingsTile: getClockingsTile,
        getUser: getUser,
        userLogin: userLogin,
        logout: logout
    };
}
