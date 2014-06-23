function dingerController($scope, $timeout) {

	

	$scope.hitEnter = function () {
		if ($scope.answer) {
			document.getElementById('text-input').disabled = true;
			var p = document.createElement('p');
			var node = document.createTextNode('You: ' + $scope.answer);
			p.appendChild(node);
			var element = document.getElementById('chat');
			element.appendChild(p);

			var possRespon = juiced[$scope.answer];
			if (!possRespon || possRespon.length == 0 || possRespon[0].length == 0) {
				possRespon = juiced[_.sample(Object.keys(juiced))];
			}
			postWords(possRespon[Math.floor(Math.random() * possRespon.length)]);

			$scope.answer = '';
		}
	};

	function postWords (words) {
		var interval = 0;

		for (var i = 0; i < words.length; i++) {
			interval += randomizer(words[i]);
			$scope.words = words;

			$timeout(function() {
				var element = document.getElementById('chat');
				var p = document.createElement('p');
				var node = document.createTextNode('George: ' + $scope.words.shift());
				p.appendChild(node);
				element.appendChild(p);
				document.getElementById('text-input').disabled = false;
				document.getElementById('text-input').focus();
			}, interval);
		}	
	}

	function randomizer (word) {
		return Math.round((Math.random() * 1000) + 200);
	}





}