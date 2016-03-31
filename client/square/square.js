var _ = require('lodash');

module.exports = function(){
	return {
		template: require('./square.html'),
		restrict: 'E',
		require: '^game',
		link: link
	};
};

function link($scope, $element, $attrs) {
	$scope.clickedSquare = clickedSquare;
	
	function clickedSquare(id) {
		if (!_.includes($scope.clicked, id) && !$scope.winner) {
			$scope.clicked.push(id);
			scoreSquare(id);
			$scope.switchTeam();
			
		}
	}

	function scoreSquare(id) {
		$element.children().addClass($scope.team);
		$scope.score[$scope.team].push(id);
		$scope.checkForWins();
	}
}