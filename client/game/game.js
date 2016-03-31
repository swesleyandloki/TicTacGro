var _ = require('lodash');

module.exports = function(){
	return {
		controller: ['$scope', '$window', '$timeout', GameController],
		scope: {},
		template: require('./game.html'),
		restrict: 'E'
	};

};

function GameController($scope, $window, $timeout) {

	$scope.initialize = initialize;
	$scope.switchTeam = switchTeam;
	$scope.checkForWins = checkForWins;
	$scope.resetGame = resetGame;
	$scope.size;
	$scope.team;
	$scope.score;
	$scope.winner;
	$scope.clicked;
	var wins;


	function initialize() {
		$scope.clicked = [];
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
		$timeout(function() {
			beautifyBoard(rows);
		});
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
		if ($scope.clicked.length === ($scope.size * $scope.size)) {
			$scope.winner = 'nobody';
		}
		_.each(wins, function(win) {
			var hits = _.intersection(win, $scope.score[$scope.team]);
			if (hits.length === $scope.size) {
				$scope.winner = $scope.team;
				return;
			}
		});
	}

	function resetGame() {
		$window.location.reload();
	}

	function beautifyBoard(rows) {
		// NOTE: please forgive me for this.  I am so so sorry.  I just noticed the board wasn't supposed to have borders.  And I am so so tired.
		if (rows > 1) {
			var leftsquares = document.getElementsByClassName("0");
			var right = '' + (rows - 1);
			var rightsquares = document.getElementsByClassName(right);
			var rows = document.getElementsByClassName("row");
			var topsquares = rows[0].getElementsByClassName('square');
			var bottomsquares = rows[rows.length-1].getElementsByClassName('square');
			_.each(leftsquares, function(el) {
				el.classList.add('leftside');
			});
			_.each(rightsquares, function(el) {
				el.classList.add('rightside');
			});
			_.each(topsquares, function(el) {
				el.classList.add('topside');
			});
			_.each(bottomsquares, function(el) {
				el.classList.add('bottomside');
			});
			
		}

	}
};