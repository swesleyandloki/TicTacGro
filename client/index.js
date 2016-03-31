var angular = require('angular');

angular.module('TicTacGro', [])
	.directive('game', require('./game/game.js'))
	.directive('board', require('./board/board.js'))
	.directive('row', require('./row/row.js'))
	.directive('square', require('./square/square.js'));