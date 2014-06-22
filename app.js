function dingerController($scope) {

	$scope.questions = [];
	$scope.answers = ['fuck you'];
	$scope.answer = '';

	$scope.hitEnter = function () {
		if ($scope.answer) {
			document.getElementById('text-input').disabled = true;
			var p = document.createElement('p');
			var node = document.createTextNode('You: ' + $scope.answer);
			p.appendChild(node);
			var element = document.getElementById('chat');
			element.appendChild(p);

			var p2 = document.createElement('p');
			var node2 = document.createTextNode('George: ' + 'fuck you');
			p2.appendChild(node2);
			var element2 = document.getElementById('chat');


			

			setTimeout(function() {
				element2.appendChild(p2);
				document.getElementById('text-input').disabled = false;
				document.getElementById('text-input').focus();
				
			}, 1000);

		

			$scope.answer = '';


		}
	};





}