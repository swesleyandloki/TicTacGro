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
		console.log(id, 'got clicked', $scope.team);
		scoreSquare(id);
		$scope.switchTeam();
	}

	function scoreSquare(id) {
		$element.children().addClass($scope.team);
		$scope.score[$scope.team].push(id);
		console.log($scope.score);
		$scope.checkForWins();
	}
}