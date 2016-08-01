module.exports = function ($scope, $location, $rootScope, common, datacontext, $timeout, localstorage) {

    var log = common.logger;
    var vm = this;
	var $pinnedGrid;
	var $homeGrid;
	var $reportGrid;
	var pinned = localstorage.getData("pinned", {pinnedTiles: [], pinnedReports: []}, "JSON");
	var hidden = localstorage.getData("hidden", {pinned: false, tiles: false, reports: false}, "JSON")
	vm.myRosterLogo = require('../../img/myRoster.png');
	vm.pinnedTiles = [];
	vm.showPinned = true;
	vm.showTiles = true;
	vm.showReports = true;
	vm.homeTiles;
	vm.reportTiles;

	//$homeGrid.masonry('prepended', <div></div>');
	//$homeGrid.masonry('appended', <div></div>');
	//$homeGrid.masonry('layout');
	//$homegrid.masonry('remove', this);

	vm.pinTile = function(rowID, type){
		var tile;
		if(type == 'grid'){
			vm.homeTiles[rowID].isPinned = true;
			vm.homeTiles[rowID].tileKey = rowID;
			vm.homeTiles[rowID].tileType = 'grid';
			tile = vm.homeTiles[rowID];
			pinned.pinnedTiles[tile.tileID] = true;
		}else if(type == 'report'){
			vm.reportTiles[rowID].isPinned = true;
			vm.reportTiles[rowID].tileKey = rowID;
			vm.reportTiles[rowID].tileType = 'report';
			tile = vm.reportTiles[rowID];
			pinned.pinnedReports[tile.tileID] = true;
		}
		localstorage.saveData("pinned", pinned, "JSON");
		vm.pinnedTiles.push(tile);
		$("." + tile.tileClass).removeClass("grid-item");
		$timeout(function(){
			$pinnedGrid.masonry("appended", $("." + tile.tileClass + ".pinned")).masonry("layout");
			$homeGrid.masonry("layout");
			$reportGrid.masonry("layout");
		}, 0);
	}

	vm.toggleRow = function(rowClass){
		switch(rowClass){
			case "pinned":
				if(vm.showPinned == true){
					$(".js-grid-pinned").slideUp();
					hidden.pinned = true;
					vm.showPinned = false;
				}else{
					$(".js-grid-pinned").slideDown();
					hidden.pinned = false;
					vm.showPinned = true;
					$pinnedGrid.masonry("layout");
				}
			break;
			case "tiles":
				if(vm.showTiles == true){
					$(".js-grid").slideUp();
					hidden.tiles = true;
					vm.showTiles = false;
				}else{
					$(".js-grid").slideDown();
					hidden.tiles = false;
					vm.showTiles = true;
					$homeGrid.masonry("layout");
				}
			break;
			case "reports":
				if(vm.showReports == true){
					$(".js-grid-reports").slideUp();
					hidden.reports = true;
					vm.showReports = false;
				}else{
					$(".js-grid-reports").slideDown();
					hidden.reports = false;
					vm.showReports = true;
					$reportGrid.masonry("layout");
				}
			break;
		}
		localstorage.saveData("hidden", hidden, "JSON");
	}

	vm.unpinTile = function(rowID, type){
		var tile = vm.pinnedTiles[rowID];
		if(type == 'grid'){
			vm.homeTiles[tile.tileKey].isPinned = false;
			pinned.pinnedTiles.splice(tile.tileID, 1);
		}else if(type == 'report'){
			vm.reportTiles[tile.tileKey].isPinned = false;
			pinned.pinnedReports.splice(tile.tileID, 1);
		}
		localstorage.saveData("pinned", pinned, "JSON");
		$("." + tile.tileClass).addClass("grid-item");
		vm.pinnedTiles.splice(rowID, 1);
		$timeout(function(){
			$pinnedGrid.masonry("remove", $("." + tile.tileClass + ".pinned")).masonry("layout");
			$homeGrid.masonry("layout");
			$reportGrid.masonry("layout");
		}, 0);
	}
	
	$(".js-grid, .js-grid-pinned, .js-grid-reports").hide();
	getTiles();
	getReports();
    activate();

	function getTiles(){
		//	Eventually got from DB
		vm.homeTiles = [
			{
				"tileID":			0,
				"tileKey":			0,
				"tileSize":			"1x1y",
				"isPinned":			false,
				"tileClass":		"roster",
				"isSelectable":		true,
				"tileIcon":			"fa-calendar",
				"tileIconSize":		"fa-4x",
				"tileName":			"Roster"
			},
			{
				"tileID":			1,
				"tileKey":			1,
				"tileSize":			"1x1y",
				"isPinned":			false,
				"tileClass":		"admin-screen",
				"isSelectable":		true,
				"tileIcon":			"fa-columns",
				"tileIconSize":		"fa-4x",
				"tileName":			"Admin Screen"
			},
			{
				"tileID":			2,
				"tileKey":			2,
				"tileSize":			"2x2y",
				"isPinned":			false,
				"tileClass":		"my-details",
				"isSelectable":		false,
				"tileIcon":			"fa-user",
				"tileIconSize":		"fa-4x",
				"tileName":			"My Details",
				"tileHeadings":		[
					"System Admin"
				],
				"tileDetails":		{
					"Email:":		"email@email.co.uk",
					"Mobile:":		"+000000000000",
					"Lieu Time:":	"0/-0 Hours",
					"Paid Leave:":	"256/256 Hours"
				}
			},
			{
				"tileID":			3,
				"tileKey":			3,
				"tileSize":			"1x1y",
				"isPinned":			false,
				"tileClass":		"my-roster",
				"isSelectable":		true,
				"tileImage":		vm.myRosterLogo,
				"tileIcon":			false,
				"tileIconSize":		false,
				"tileName":			"My Roster"
			},
			{
				"tileID":			4,
				"tileKey":			4,
				"tileSize":			"1x1y",
				"isPinned":			false,
				"tileClass":		"payroll-submission",
				"isSelectable":		true,
				"tileIcon":			"fa-money",
				"tileIconSize":		"fa-4x",
				"tileName":			"Payroll Submission"
			},
			{
				"tileID":			5,
				"tileKey":			5,
				"tileSize":			"1x1y",
				"isPinned":			false,
				"tileClass":		"timesheets",
				"isSelectable":		true,
				"tileIcon":			"fa-clock-o",
				"tileIconSize":		"fa-4x",
				"tileName":			"Timesheets"
			},
			{
				"tileID":			6,
				"tileKey":			6,
				"tileSize":			"1x1y",
				"isPinned":			false,
				"tileClass":		"roster-changes",
				"isSelectable":		true,
				"tileIcon":			"fa-calendar-minus-o",
				"tileIconSize":		"fa-4x",
				"tileName":			"Roster Changes"
			},
			{
				"tileID":			7,
				"tileKey":			7,
				"tileSize":			"2x",
				"isPinned":			false,
				"tileClass":		"staff-shift-swap-requests",
				"isSelectable":		true,
				"tileIcon":			"fa-exchange",
				"tileIconSize":		"fa-2x",
				"tileName":			"Staff Shift Swap Requests",
				"tileDetails":		{
					"Requests:": 999
				}
			},
			{
				"tileID":			8,
				"tileKey":			8,
				"tileSize":			"2x",
				"isPinned":			false,
				"tileClass":		"unrecognised-messages",
				"isSelectable":		true,
				"tileIcon":			"fa-envelope-square fa-4x",
				"tileIconSize":		"fa-4x",
				"tileName":			"Unrecognised Messages",
				"tileDetails":		{
					"Messages:": 999
				}
			},
			{
				"tileID":			9,
				"tileKey":			9,
				"tileSize":			"2x",
				"isPinned":			false,
				"tileClass":		"clockings-by-person",
				"isSelectable":		true,
				"tileIcon":			"fa-clock-o",
				"tileIconSize":		"fa-4x",
				"tileName":			"Clockings by Person",
				"tileDetails":		{
					"Due:":		999,
					"Late:":	999
				}
			},
			{
				"tileID":			10,
				"tileKey":			10,
				"tileSize":			"2x",
				"isPinned":			false,
				"tileClass":		"clockings",
				"isSelectable":		true,
				"tileIcon":			"fa-clock-o",
				"tileIconSize":		"fa-4x",
				"tileName":			"Clockings",
				"tileDetails":		{
					"Due:":	999,
					"Late:":	999
				}
			},
			{
				"tileID":			11,
				"tileKey":			11,
				"tileSize":			"2x",
				"isPinned":			false,
				"tileClass":		"scheduled-rosters",
				"isSelectable":		true,
				"tileIcon":			"fa-clock-o",
				"tileIconSize":		"fa-4x",
				"tileName":			"Scheduled Rosters",
				"tileDetails":		{
					"Runs:": 999
				}
			},
			{
				"tileID":			12,
				"tileKey":			12,
				"tileSize":			"2x",
				"isPinned":			false,
				"tileClass":		"late-staff",
				"isSelectable":		true,
				"tileIcon":			"fa-clock-o",
				"tileIconSize":		"fa-4x",
				"tileName":			"Late Staff",
				"tileDetails":		{
					"Late:": 999
				}
			},
			{
				"tileID":			13,
				"tileKey":			13,
				"tileSize":			"1x1y",
				"isPinned":			false,
				"tileClass":		"admin-message-board",
				"isSelectable":		true,
				"tileIcon":			"fa-envelope",
				"tileIconSize":		"fa-3x",
				"tileName":			"Admin Message Board"
			},
			{
				"tileID":			14,
				"tileKey":			14,
				"tileSize":			"1x1y",
				"isPinned":			false,
				"tileClass":		"budget-data",
				"isSelectable":		true,
				"tileIcon":			"fa-bar-chart",
				"tileIconSize":		"fa-4x",
				"tileName":			"Budget Data"
			},
			{
				"tileID":			15,
				"tileKey":			15,
				"tileSize":			"2x",
				"isPinned":			false,
				"tileClass":		"staff-requests",
				"isSelectable":		true,
				"tileIcon":			"fa-calendar",
				"tileIconSize":		"fa-4x",
				"tileName":			"Staff Requests",
				"tileHeadings":		[
					"999 Leave Requests",
					"Next Leave:",
					"29/07/2016",
					"Long Name Here"
				]
			},
			{
				"tileID":			16,
				"tileKey":			16,
				"tileSize":			"2x",
				"isPinned":			false,
				"tileClass":		"demand-data",
				"isSelectable":		true,
				"tileIcon":			"fa-calendar",
				"tileIconSize":		"fa-4x",
				"tileName":			"Demand Data",
				"tileDetails":		{
					"Days:": 999
				}
			},
			{
				"tileID":			17,
				"tileKey":			17,
				"tileSize":			"2x",
				"isPinned":			false,
				"tileClass":		"agency-search",
				"isSelectable":		true,
				"tileIcon":			"fa-clock-o",
				"tileIconSize":		"fa-4x",
				"tileName":			"Agency Search",
				"tileDetails":		{
					"Searches:": 999
				}
			},
			{
				"tileID":			18,
				"tileKey":			18,
				"tileSize":			"2x",
				"isPinned":			false,
				"tileClass":		"next-working-day",
				"isSelectable":		true,
				"tileIcon":			"fa-calendar",
				"tileIconSize":		"fa-4x",
				"tileName":			"Next Shift",
				"tileHeadings":		[
					"08:30-17:00",
					"27th July 2016",
					"08:30 - 17:00",
					"Long Location Here"
				]
			},
			{
				"tileID":			19,
				"tileKey":			19,
				"tileSize":			"1x1y",
				"isPinned":			false,
				"tileClass":		"my-absences",
				"isSelectable":		true,
				"tileIcon":			"fa-calendar",
				"tileIconSize":		"fa-4x",
				"tileName":			"My Absences"
			},
			{
				"tileID":			20,
				"tileKey":			20,
				"tileSize":			"1x1y",
				"isPinned":			false,
				"tileClass":		"my-team-roster",
				"isSelectable":		true,
				"tileIcon":			"fa-bar-chart",
				"tileIconSize":		"fa-4x",
				"tileName":			"My Team Roster"
			},
			{
				"tileID":			21,
				"tileKey":			21,
				"tileSize":			"2x",
				"isPinned":			false,
				"tileClass":		"my-annualised-hours",
				"isSelectable":		true,
				"tileIcon":			"fa-clock-o",
				"tileIconSize":		"fa-3x",
				"tileName":			"My Annualised Hours",
				"tileDetails":		{
					"Hours:": 999
				}
			},
			{
				"tileID":			22,
				"tileKey":			22,
				"tileSize":			"2x",
				"isPinned":			false,
				"tileClass":		"my-leave",
				"isSelectable":		true,
				"tileIcon":			"fa-calendar",
				"tileIconSize":		"fa-4x",
				"tileName":			"My Leave",
				"tileDetails":		{
					"Requests:": 999
				}
			},
			{
				"tileID":			23,
				"tileKey":			23,
				"tileSize":			"1x1y",
				"isPinned":			false,
				"tileClass":		"change-password",
				"isSelectable":		true,
				"tileIcon":			"fa-user",
				"tileIconSize":		"fa-4x",
				"tileName":			"Change Password"
			},
			{
				"tileID":			24,
				"tileKey":			24,
				"tileSize":			"1x1y",
				"isPinned":			false,
				"tileClass":		"my-payslip",
				"isSelectable":		true,
				"tileIcon":			"fa-money",
				"tileIconSize":		"fa-4x",
				"tileName":			"My Payslip"
			},
			{
				"tileID":			25,
				"tileKey":			25,
				"tileSize":			"2x",
				"isPinned":			false,
				"tileClass":		"recent-messages",
				"isSelectable":		true,
				"tileIcon":			"fa-envelope",
				"tileIconSize":		"fa-4x",
				"tileName":			"Recent Messages",
				"tileDetails":		{
					"Messages:": 999
				}
			},
			{
				"tileID":			26,
				"tileKey":			26,
				"tileSize":			"1x1y",
				"isPinned":			false,
				"tileClass":		"my-shift-swap-requests",
				"isSelectable":		true,
				"tileIcon":			"fa-exchange",
				"tileIconSize":		"fa-3x",
				"tileName":			"My Shift Swap Requests"
			},
			{
				"tileID":			27,
				"tileKey":			27,
				"tileSize":			"1x1y",
				"isPinned":			false,
				"tileClass":		"my-personal-details",
				"isSelectable":		true,
				"tileIcon":			"fa-user",
				"tileIconSize":		"fa-4x",
				"tileName":			"My Personal Details"
			},
			/*
			{
				"tileID":			28,
				"tileKey":			28,
				"tileSize":			"2x",
				"isPinned":			false,
				"tileClass":		"my-locations",
				"isSelectable":		false,
				"tileIcon":			"fa-building",
				"tileIconSize":		"fa-4x",
				"tileName":			"My Locations",
				"tileHeadings":		[
					"Long Location Name"
				]
			},
			*/
			{
				"tileID":			29,
				"tileKey":			28,
				"tileSize":			"2x",
				"isPinned":			false,
				"tileClass":		"my-availabilities",
				"isSelectable":		true,
				"tileIcon":			"fa-calendar",
				"tileIconSize":		"fa-4x",
				"tileName":			"My Availabilities",
				"tileDetails":		{
					"Days:": 999
				}
			}
		];
		//	Loop through tiles, hiding pinned ones.
		$.each(vm.homeTiles, function(rowID, tile){
			//	If pinned, pin
			if(tile.tileID in pinned.pinnedTiles){
				vm.homeTiles[rowID].isPinned = true;
				vm.homeTiles[rowID].tileKey = rowID;
				vm.homeTiles[rowID].tileType = 'grid';
				tile = vm.homeTiles[rowID];
				vm.pinnedTiles.push(tile);
				$("." + tile.tileClass).removeClass("grid-item");
			}
		});
	}

	function getReports(){
		vm.reportTiles = [
			{
				"tileID":			0,
				"tileKey":			0,
				"tileSize":			"1x1y",
				"isPinned":			false,
				"tileClass":		"account-wage-analysis-by-person",
				"isSelectable":		true,
				"tileIcon":			"fa-columns",
				"tileIconSize":		"fa-3x",
				"tileName":			"Account Wage Analysis by Person"
			},
			{
				"tileID":			1,
				"tileKey":			1,
				"tileSize":			"1x1y",
				"isPinned":			false,
				"tileClass":		"active-users",
				"isSelectable":		true,
				"tileIcon":			"fa-columns",
				"tileIconSize":		"fa-3x",
				"tileName":			"Active Users"
			},
			{
				"tileID":			2,
				"tileKey":			2,
				"tileSize":			"1x1y",
				"isPinned":			false,
				"tileClass":		"attendance",
				"isSelectable":		true,
				"tileIcon":			"fa-columns",
				"tileIconSize":		"fa-3x",
				"tileName":			"Attendance"
			},
			{
				"tileID":			3,
				"tileKey":			3,
				"isPinned":			false,
				"tileSize":			"1x1y",
				"tileClass":		"contracted-hours",
				"isSelectable":		true,
				"tileIcon":			"fa-columns",
				"tileIconSize":		"fa-3x",
				"tileName":			"Contracted Hours"
			},
			{
				"tileID":			4,
				"tileKey":			4,
				"isPinned":			false,
				"tileSize":			"1x1y",
				"tileClass":		"employee-holiday-groups",
				"isSelectable":		true,
				"tileIcon":			"fa-columns",
				"tileIconSize":		"fa-3x",
				"tileName":			"Employee Holiday Groups"
			},
			{
				"tileID":			5,
				"tileKey":			5,
				"isPinned":			false,
				"tileSize":			"1x1y",
				"tileClass":		"relief-shifts",
				"isSelectable":		true,
				"tileIcon":			"fa-columns",
				"tileIconSize":		"fa-3x",
				"tileName":			"Relief Shifts"
			},
			{
				"tileID":			6,
				"tileKey":			6,
				"isPinned":			false,
				"tileSize":			"1x1y",
				"tileClass":		"shortfalls",
				"isSelectable":		true,
				"tileIcon":			"fa-columns",
				"tileIconSize":		"fa-3x",
				"tileName":			"Shortfalls"
			},
			{
				"tileID":			7,
				"tileKey":			7,
				"isPinned":			false,
				"tileSize":			"1x1y",
				"tileClass":		"skills",
				"isSelectable":		true,
				"tileIcon":			"fa-columns",
				"tileIconSize":		"fa-3x",
				"tileName":			"Skills"
			},
			{
				"tileID":			8,
				"tileKey":			8,
				"isPinned":			false,
				"tileSize":			"1x1y",
				"tileClass":		"staff-clockings",
				"isSelectable":		true,
				"tileIcon":			"fa-columns",
				"tileIconSize":		"fa-3x",
				"tileName":			"Staff Clockings"
			},
			{
				"tileID":			9,
				"tileKey":			9,
				"isPinned":			false,
				"tileSize":			"1x1y",
				"tileClass":		"staff-shortfalls",
				"isSelectable":		true,
				"tileIcon":			"fa-columns",
				"tileIconSize":		"fa-3x",
				"tileName":			"Staff Shortfalls"
			},
			{
				"tileID":			10,
				"tileKey":			10,
				"isPinned":			false,
				"tileSize":			"1x1y",
				"tileClass":		"yearly-planner",
				"isSelectable":		true,
				"tileIcon":			"fa-columns",
				"tileIconSize":		"fa-3x",
				"tileName":			"Yearly Planner"
			}
		];
		//	Loop through tiles, hiding pinned ones.
		$.each(vm.reportTiles, function(rowID, tile){
			//	If pinned, pin
			if(tile.tileID in pinned.pinnedReports){
				vm.reportTiles[rowID].isPinned = true;
				vm.reportTiles[rowID].tileKey = rowID;
				vm.reportTiles[rowID].tileType = 'report';
				tile = vm.reportTiles[rowID];
				vm.pinnedTiles.push(tile);
				$("." + tile.tileClass).removeClass("grid-item");
			}
		});
	}

    function activate() {
        common.activateController([], 'home').then(() => {
        	var gridOptions = {
				itemSelector: '.grid-item',
				gutter: 10,
				columnWidth: 125,
				fitWidth: true
			};

			$timeout(function(){
				$pinnedGrid = $(".js-grid-pinned").masonry(gridOptions);
				$homeGrid = $(".js-grid").masonry(gridOptions);
				$reportGrid = $(".js-grid-reports").masonry(gridOptions);
				//	If meant to show the pinned grid
				if(hidden.hasOwnProperty("pinned") & hidden.pinned !== true){
					vm.showPinned = true;
					$(".js-grid-pinned").show();
				}else{
					vm.showPinned = false;
				}
				//	If meant to show the main grid
				if(hidden.hasOwnProperty("tiles") & hidden.tiles !== true){
					vm.showTiles = true;
					$(".js-grid").show();
				}else{
					vm.showTiles = false;
				}
				//	If meant to show the reports grid
				if(hidden.hasOwnProperty("reports") & hidden.reports !== true){
					vm.showReports = true;
					$(".js-grid-reports").show();
				}else{
					vm.showReports = false;
				}
				//$(".js-grid, .js-grid-pinned, .js-grid-reports").show();
			}, 0);
        });
    }
};
