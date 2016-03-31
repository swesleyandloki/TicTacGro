
module.exports = function(){
	return {
		template: require('./board.html'),
		restrict: 'E',
		require: '^game'
	};
};