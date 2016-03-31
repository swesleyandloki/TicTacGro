var _ = require('lodash');

module.exports = function(){
	return {
		controller: ['$scope', '$window', '$document', GameController],
		scope: {},
		template: require('./game.html'),
		restrict: 'E'
	};

};

function GameController($scope, $window, $document) {

	$scope.initialize = initialize;
	$scope.switchTeam = switchTeam;
	$scope.checkForWins = checkForWins;
	$scope.resetGame = resetGame;
	$scope.size;
	$scope.team;
	$scope.score;
	$scope.winner;
	var wins;


	function initialize() {
		$scope.board = {};
		$scope.team = 'x';
		$scope.winner = undefined;
		$scope.score = {
			o: [],
			x: []
		};
		wins = [];

		var rows = parseInt(this.rows) || 3;

		for (var i=0; i<rows; i++) {
			//board i is a row
			$scope.board[i] = [];
			for (var j=0; j<rows; j++) {
				var square = {
					id: (i * rows) + j
				};
				//push row number of squares into each row
				$scope.board[i].push(square);
			}
		}
		generateRowAndColWins(rows);
		generateDiagWins(rows);
		$scope.size = rows;
	}

	function generateRowAndColWins(rows) {
		for (var i=0; i<rows; i++) {
			var rowWin = [];
			var colWin = [];
			for (var j=0; j<rows; j++) {
				var nextRowNumber = (i * rows) + j;
				var nextColNumber = (j * rows) + i;
				rowWin.push(nextRowNumber);
				colWin.push(nextColNumber);
			}

			wins.push(rowWin, colWin);
		}
	}

	function generateDiagWins(rows) {
		var leftWin = [];
		var rightWin = [];
		var leftStep = (rows * rows - 1)/(rows - 1);
		var rightStep = rows - 1;
		for (var i=0; i<rows*rows; i+=leftStep) {
			leftWin.push(i);
		}
		for (var j=rows-1; j<rows*rows-1; j+=rightStep) {
			rightWin.push(j);
		}
		wins.push(leftWin, rightWin);
	}

	function switchTeam() {
		$scope.team = $scope.team === 'x' ? 'o' : 'x';
	}

	function checkForWins() {
		_.each(wins, function(win) {
			var hits = _.intersection(win, $scope.score[$scope.team]);
			console.log(hits, win, hits.length, $scope.size);
			if (hits.length === $scope.size) {
				$scope.winner = $scope.team;
				return;
			}
		});
	}

	function resetGame() {
		$window.location.reload();
	}
};