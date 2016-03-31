var angular = require('angular');

module.exports = function(){
	return {
		template: require('./board.html'),
		restrict: 'E',
		require: '^game',
		link: link
	};
};

function link($scope, $element, $attrs) {

}