module.exports = function(){
	return {
		template: require('./row.html'),
		restrict: 'E',
		require: '^game'
	};
};
