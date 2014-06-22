function dingerController($scope) {

	$scope.questions = [];
	$scope.answers = ['fuck you'];
	$scope.answer = '';

	$scope.hitEnter = function () {
		if ($scope.answer) {
			var p = document.createElement('p');
			var node = document.createTextNode('You: ' + $scope.answer);
			p.appendChild(node);
			var element = document.getElementById('chat');
			element.appendChild(p);

			$scope.answer = '';

		}
	};





}