module.exports = (common) => {

    var log = common.logger;
    var vm = this;
    activate();

	var $homeGrid = $(".grid").masonry({
        itemSelector: '.grid-item',
		gutter: 10,
		stagger: 20,
		fitWidth: true
    });

	//$homeGrid.masonry('prepended', <div></div>');
	//$homeGrid.masonry('appended', <div></div>');
	//$homeGrid.masonry('layout');
	//$homegrid.masonry('remove', this);

    function activate() {
        common.activateController([], 'home').then(() => {
          // log('success', 'Home', 'Page loaded..');
        });
    }
};
