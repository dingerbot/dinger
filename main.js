function dingerController($scope, $timeout) {

	$scope.hitEnter = function () {
		if ($scope.answer) {
			
			// underscore templating feature
			var userTemplate = _.template( $('#user-template').html() );
			$('.chat-padding-bottom').before( userTemplate({query: $scope.answer}) );
			// update scrolling 60% gloves ATK
			document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;

			$scope.answer = '';
			$('#text-input').attr('placeholder', '');
			document.getElementById('text-input').disabled = true;

			// version 1 intelligence. exact matching | random from list
			var possRespon = juiced[$scope.answer];
			if (!possRespon || possRespon.length == 0 || possRespon[0].length == 0) {
				possRespon = juiced[_.sample(Object.keys(juiced))];
			}
			postResponse(possRespon);
		}
	};

	function postResponse (possRespon) {
		var interval = 0;
		var responseToPost = Math.floor(Math.random() * possRespon.length);
		$scope.possRespon = possRespon;

		// say everything in key list
		for (var i = 0; i < $scope.possRespon[responseToPost].length; i++) {
			interval += randomizer($scope.possRespon[responseToPost][i]);

			$timeout(function() {
				var georgeTemplate = _.template($('#george-template').html());
				$('.chat-padding-bottom').before( georgeTemplate( {response: $scope.possRespon[responseToPost].shift()} ) );

				var fbsound = new Audio('fb.mp3');
				fbsound.play();

				document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;

				if($scope.possRespon[responseToPost].length == 0){
					$scope.possRespon.splice(responseToPost, 1);
					document.getElementById('text-input').disabled = false;
					document.getElementById('text-input').focus();
				}

			}, interval);
		}
	}

	function randomizer (word) {
		return Math.floor((Math.random() * 800) + word.length*55); //used to be +200
	}
}