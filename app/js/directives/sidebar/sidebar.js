/*global swal: true*/
'use strict';
class NavCtrl {
	constructor($scope, $location, $rootScope, common, datacontext) {

		var vm = this;

		$rootScope.currentRole;
		vm.user = {};
		vm.login = login;
		vm.logout = logout;
		vm.currentUser = '';
		var _currentUser = 684;
		vm.UserRoles = [];
		vm.Locations = [];
		vm.Roles = [];
		vm.RoleDropDown = [];
		vm.currentRole = "";
		vm.activeRole = "";
		vm.activeLocation = "";
		
		this.app = require('./sidebar.json');
		vm.logo = this.image = require('../../../img/machorb128.png');

		var getLocations = function(){
			//	Empty the current roles
			vm.UserRoles = [];
			vm.Locations = [];
			vm.Roles = [];
			vm.RoleDropDown = [];
			//	Get the roles for this user from the API
			datacontext.getLocations(_currentUser).then(function(locations){
				//	Add the locations
				$.each(locations, function(locationKey, location){
					vm.Locations[location.locationID] = {
						locationID: location.locationID,
						locationName: location.locationName
					};
					var roleDropDown = {
						locationID: location.locationID,
						roleIDs: []
					}
					//	Add the roles, roleDropDown, and user roles
					$.each(location.locationRoles, function(roleKey, role){
						vm.Roles[role.roleID] = {
							roleID: role.roleID,
							contactRoleID: role.contactRoleID,
							roleName: role.roleName,
							roleStartDate: role.roleStartDate,
							roleEndDate: role.roleEndDate
						};
						roleDropDown.roleIDs.push({
							roleID: role.roleID,
							contactRoleID: role.contactRoleID
						});
						vm.UserRoles[role.contactRoleID] = {
							locationID: location.locationID,
							roleID: role.roleID
						};
					});
					vm.RoleDropDown.push(roleDropDown);
				});
				//  If there is no current role, use the first one
				if(vm.currentRole == ""){//jshint ignore:line
					vm.changeRole(Object.keys(vm.UserRoles)[0]);
				}
			});
		};

		getLocations();


		require('../../custom/sidebar.js');

		vm.changeRole = function(userRoleID){
			//  Will eventually have more
			vm.currentRole = userRoleID;
			vm.activeRole = vm.Roles[vm.UserRoles[userRoleID].roleID].roleName;
			vm.activeLocation = vm.Locations[vm.UserRoles[userRoleID].locationID].locationName;
			$rootScope.$broadcast("roleChanged", _currentUser, vm.Roles[vm.UserRoles[userRoleID].roleID]);
		};

		activate();

		function activate() {
			common.activateController([currentUser()], 'sidebar').then(() => {

			});
		}

		vm.logout = function(){
			vm.UserRoles = [];
			vm.Locations = [];
			vm.Roles = [];
			vm.RoleDropDown = [];
			vm.currentRole = "";
			vm.activeRole = "";
			vm.activeLocation = "";
		}

		$scope.select = function (item) {
			$scope.selected = item;
		};

		$scope.isActive = function (item) {
			if ($location.path() === item) {
				return true;
			}
		};

		function currentUser(){
			return datacontext.getUser().then(function(data){
				vm.currentUser = data;
				return data;
			});
		}

		var loginHTML =
			'<div> <form method="post" role="form" name="login"> <div> ' +
			'<div class="input-group login-inputs"> ' +
			'<span class="input-group-addon input-group-addon-login"><i class="fa fa-user"></i></span>' +
			'<input type="text" class="form-control m-t-0" placeholder="Username" id="username"> ' +
			'</div> ' +
			'</div> ' +
			'<div> ' +
			'<div class="input-group login-inputs"> ' +
			'<span class="input-group-addon input-group-addon-login"><i class="fa fa-key"></i></span> ' +
			'<input type="password" class="form-control m-t-0" placeholder="Password" id="password"> ' +
			'</div> ' +
			'</div> ' +
			'</form> ' +
			'</div>';


		function login() {
			swal({
					title: 'Please enter your login details',
					html: true,
					text: loginHTML,
					imageUrl: require('../../../img/machorb128.png'),
					showCancelButton: true,
					closeOnConfirm: false
				},
				function () {
					vm.user.userName = $('#username').val();
					vm.user.password = $('#password').val();
					loginFn();
				});
		}

		function loginFn() {
			if (vm.user.userName === '' || vm.user.password === '') {
				swal({
						title: 'There is a problem...',
						text: 'Please enter both a username and a password',
						type: 'warning',
						closeOnConfirm: false
					},
					function () {
						login();
					}
				);
				vm.status = 1;
			}
			else {
				return datacontext.userLogin(vm.user)
					.then(function (data) {
						vm.status = 2;
						swal({
							title: 'Login successful!',
							text: '',
							type: 'success',
							timer: 2000
						});
						$rootScope.$broadcast('loggedIn', true);
						currentUser();
						return data;
					}, function (err) {
						if (err.status === 401) {
							swal({
									title: 'There is a problem...',
									text: 'Username or password is incorrect',
									type: 'error',
									closeOnConfirm: false
								},
								function () {
									login();
								}
							);
							vm.status = 3;
						}
					});
			}
		}

		function logout(){
			return datacontext.logout().then(function(){
				currentUser();

				swal({
					title: 'You have been logged out',
					text: '',
					type: 'success',
					timer: 2000
				});

				console.log('log out successful');
			});
		}
	}
}

module.exports = angular.module('app.sidebar', []).directive('sidebar', function () {
	return {
		controller: NavCtrl,
		controllerAs: 'sidebar',
		template: require('../../../html/directives/sidebar.html')
	};
});

