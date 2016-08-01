module.exports = angular.module('app.localstorage', []).service('localstorage', localstorage);

function localstorage() {

	function getData(name = "", defaultVal = "", format = ""){
		if(name.trim === "" || name === null || typeof name === 'undefined'){
			return null;
		}
		var value;
		switch(format){
			case "JSON":
				value = !localStorage[name] ? defaultVal : JSON.parse(localStorage[name]);
				break;
			case "int":
				value = !localStorage[name] ? defaultVal : localStorage[name] * 1;
				break;
			default:
				value = !localStorage[name] ? defaultVal : localStorage[name];
		}
		return value;
	}

	function saveData(name = "", value = "", format = ""){
		if(name.trim === "" || name === null || typeof name === 'undefined'){
			return false;
		}
		switch(format){
			case "JSON":
				value = JSON.stringify(value);
				break;
			case "int":
				value = value * 1;
				break;
		}
		localStorage[name] = value;
		return true;
	}

	function removeData(name){
		localStorage.removeItem(name);
	}

	return {
		getData: getData,
		saveData: saveData,
		removeData: removeData
	};
}