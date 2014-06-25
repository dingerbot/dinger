function dingerController($scope, $timeout) {

	$scope.hitEnter = function () {
		if ($scope.answer) {
			
			// underscore templating feature
			var userTemplate = _.template( $('#user-template').html() );
			$('.chat-padding-bottom').before( userTemplate({query: $scope.answer}) );
			// update scrolling 60% gloves ATK
			document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;

			$('#text-input').attr('placeholder', '');
			document.getElementById('text-input').disabled = true;

			// version 1 intelligence. exact matching query
			var possRespon = juiced[$scope.answer];

			// if no matches, start version 2 intelligence
			if (!possRespon) {
				var ansFragments = $scope.answer.split('');
				//ok we have each individual leters
				//lets do 2 letters at a time
				var allKeys = _.keys(juiced); 
				console.log(allKeys);

				var twos = [];
				for (var i = 0; i < ansFragments.length; i+=2) {
					if (i != ansFragments.length-1) {
						twos.push(''+ ansFragments[i]+ansFragments[i+1]);
					} else {
						twos.push('' + ansFragments[i]);
					}
				}
				console.log(twos);

				var testing = {'its': 'hi','hello':'wrong'};
				var pattern = 'its';
				var re = new RegExp(pattern);
				console.log(testing[re]); //expecting 'hi', returned undefined

				// for (var i = 0; i < allKeys.length; i++) {
				// 	console.log('hi');
				// }

				//try to match all, take 2 from back, and try to match regex and repeat until no matches
				// var pattern = '.*' + twos.join('') + '.*';
				// var re = new RegExp(pattern);

				
			}

			//if no matches,response is 0, or array is empty, pick random from all possible
			if (!possRespon || possRespon.length == 0 || possRespon[0].length == 0) {
				possRespon = juiced[_.sample(Object.keys(juiced))];
			}

			postResponse(possRespon);
			$scope.answer = '';
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