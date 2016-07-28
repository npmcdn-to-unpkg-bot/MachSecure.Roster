module.exports = function ($scope, $location, $rootScope, common, datacontext, $timeout) {

    var log = common.logger;
    var vm = this;
	var $pinnedGrid;
	var $homeGrid;
	vm.myRosterLogo = require('../../img/myRoster.png');
	vm.pinnedTiles = [];
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
			"tileHeadings":		[
				"999 Requests need approval"
			]
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
			"tileHeadings":		[
				"999 Messages"
			]
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
			"tileHeadings":		[
				"999 Due On Site",
				"999 Late"
			]
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
			"tileHeadings":		[
				"999 Due On Site",
				"999 Late"
			]
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
			"tileHeadings":		[
				"999 Runs"
			]
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
			"tileHeadings":		[
				"999 Late"
			]
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
			"tileHeadings":		[
				"999 Days"
			]
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
			"tileHeadings":		[
				"999 Searches"
			]
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
			"tileHeadings":		[
				"999 Hours Worked"
			]
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
			"tileHeadings":		[
				"999 Requests for Approval"
			]
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
			"tileHeadings":		[
				"999 Recent Messages"
			]
		},
		{
			"tileID":			26,
			"tileKey":			26,
			"tileSize":			"1x1y",
			"isPinned":			false,
			"tileClass":		"my-shift-swap-requests",
			"isSelectable":		true,
			"tileIcon":			"fa-calendar",
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
			"tileHeadings":		[
				"999 Days"
			]
		}
	];

	//$homeGrid.masonry('prepended', <div></div>');
	//$homeGrid.masonry('appended', <div></div>');
	//$homeGrid.masonry('layout');
	//$homegrid.masonry('remove', this);

	vm.pinTile = function(rowID, $event){
		vm.homeTiles[rowID].isPinned = true;
		vm.homeTiles[rowID].tileKey = rowID;
		var tile = vm.homeTiles[rowID];
		vm.pinnedTiles.push(tile);
		$("." + tile.tileClass).removeClass("grid-item");
		$timeout(function(){
			$pinnedGrid.masonry("appended", $("." + tile.tileClass + ".pinned")).masonry("layout");
			$homeGrid.masonry("layout");
		}, 0);
	}

	vm.unpinTile = function(rowID, $event){
		var tile = vm.pinnedTiles[rowID];
		vm.homeTiles[tile.tileKey].isPinned = false;
		$("." + tile.tileClass).addClass("grid-item");
		vm.pinnedTiles.splice(rowID, 1);
		$timeout(function(){
			$pinnedGrid.masonry("remove", $("." + tile.tileClass + ".pinned")).masonry("layout");
			$homeGrid.masonry("layout");
		}, 0);
	}
	
	$(".grid, .grid-pinned").hide();
    activate();

    function activate() {
        common.activateController([], 'home').then(() => {
        	var gridOptions = {
				itemSelector: '.grid-item',
				gutter: 10,
				//stagger: 20,
				columnWidth: 125,
				fitWidth: true
			};

			$timeout(function(){
				$pinnedGrid = $(".grid-pinned").masonry(gridOptions);
				$homeGrid = $(".grid").masonry(gridOptions);
				$(".grid, .grid-pinned").show();
			}, 0);
        });
    }
};
