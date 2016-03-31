module.exports = function(){
	return {
		template: require('./row.html'),
		restrict: 'E',
		require: '^game',
		link: link
	};
};

function link($scope, $element, $attrs) {
	console.log('row', $element);
}