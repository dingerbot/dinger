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
				console.log('hi');
				var queryWords = $scope.answer.replace(/[^A-Za-z\s]/g, '').toLowerCase().split(' ');
				console.log(queryWords);

				//ok we have each individual leters
				//lets do 2 letters at a time
				var allKeys = _.keys(juiced); 

				// var queryWords = [];
				// for (var i = 0; i < ansFragments.length; i+=2) {
				// 	if (i != ansFragments.length-1) {
				// 		queryWords.push(''+ ansFragments[i]+ansFragments[i+1]);
				// 	} else {
				// 		queryWords.push('' + ansFragments[i]);
				// 	}
				// }

				console.log(queryWords);

				var counts = [];
				var prev = -1;
				var whitelist = 'how what when where why did who are'
				// var current;
				var splitKeys;
				var increment;
				var isQuestion;
				for (var i = 0; i < allKeys.length; i++) {
					splitKeys = allKeys[i].toLowerCase().split(' ');
					counts[i] = 0;
					prev = 0;
					for (var j = 0; j < queryWords.length; j++) {
						increment = 1;
						isQuestion = false;
						if (j == 0 && whitelist.indexOf(queryWords[0]) != -1 && splitKeys[0] == queryWords[0]) {
							increment = 3;
							isQuestion = true;
						}
						if (j == queryWords.length/2) {
							for (var d = 0; d < splitKeys.length; d++) {
								if (allKeys[j] == queryWords[queryWords.length/2]) {
									increment += 1.5;
								}
							}
						}
						if (isQuestion && splitKeys[splitKeys.length-1] == queryWords[queryWords.length-1]) {
							increment += 2;
						} 

						for (var k = prev; k < splitKeys.length; k++) {
							if(splitKeys[k] == queryWords[j] && k >= prev) {
								prev = k;
								counts[i] += increment;
								break;
							}
						}
						// current = allKeys[i].indexOf(queryWords[j]);
						// if(current > prev) {
						// 	counts[i]++;
						// 	prev = current;
						// }
					}
				}

				var maxIndex = 0;
				for (var i = 1; i < counts.length; i++){
					if(counts[i] > counts[maxIndex]) {
						maxIndex = i;
					} 
				}
				console.log('counts', counts[maxIndex]);

				console.log('what it blazin: ', allKeys[maxIndex]);
				if (counts[maxIndex] != 0) {
					console.log('jucied,', juiced[allKeys[maxIndex]]);
					possRespon = juiced[allKeys[maxIndex]];					
				}
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