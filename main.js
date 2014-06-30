function dingerController($scope, $timeout) {
	'use strict';
	$scope.hitEnter = function () {

		//takes two words, returns the percent matching
		function compareWords(word1,word2) {
				//word 1 must always be smaller after this guy blaze
				if (word1.length > word2.length) {
					var temp = word2;
					word2 = word1;
					word1 = temp;
				}

				var previousIndex = -1;
				var blazes = 0;
				var currentIndex;
				for (var i = 0; i < word1.length; i++) {
					currentIndex = word2.indexOf(word1.charAt(i), previousIndex+1);

					if (currentIndex == -1) {
						continue;
					}
					else if (currentIndex < previousIndex+3) {
						previousIndex = currentIndex;
						blazes++;
					} 
					else {
						previousIndex++;					
					}
				}
			return (blazes / word2.length); 
		}

		if ($scope.answer) {
			// underscore templating feature
			var userTemplate = _.template( $('#user-template').html() );
			$('.chat-padding-bottom').before( userTemplate({query: $scope.answer}) );

			// update scrolling after message
			document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;

			$('#text-input').attr('placeholder', '');
			document.getElementById('text-input').disabled = true;

			// start here, version 1 intelligence: exact matching query
			// key to juice is the key in juiced that best matched the user's query
			var keyToJuice = $scope.answer;
			var allKeys = _.keys(juiced);
			var counts = [];

			// if no matches, start version 2 intelligence: percent matching with weights
			if (!juiced[keyToJuice]) {
				var queryWords = $scope.answer.replace(/[^A-Za-z\s]/g, '').toLowerCase().split(' ');
				var whitelist = 'how what when where why did who are'.split(' ');
				var prev = -1;
				var splitKeys;
				var increment;
				var isQuestion;
				var proletariatThresh = 0.5;
				var bourgeoisieThreash = 0.75;

				for (var i = 0; i < allKeys.length; i++) {

					splitKeys = allKeys[i].toLowerCase().split(' ');

					counts[i] = 0;
					prev = 0;

					for (var j = 0; j < queryWords.length; j++) {
						//redefine this variable for what you want to compare;
						var matchPercentage;

						increment = 1;
						isQuestion = false;

						//match beginning 
						if (j==0) {
							for (var k = 0; k < whitelist.length; k++) {
								matchPercentage = compareWords(whitelist[k],queryWords[0]);
								if (matchPercentage > bourgeoisieThreash) {
									increment += 2.5 * matchPercentage;
									isQuestion = true;
								}
							}
						}
						if (isQuestion) {
							//match middle 
							if (j == Math.floor(queryWords.length/2)) {
								for (var d = 0; d < splitKeys.length; d++) {
									matchPercentage = compareWords(splitKeys[d],queryWords[Math.floor(queryWords.length/2)]);
									if (matchPercentage > proletariatThresh) {
										increment += 1.5 * matchPercentage;
									}
								}
							}

							//match ending
							matchPercentage = compareWords(splitKeys[splitKeys.length-1], queryWords[queryWords.length-1]);
							if(matchPercentage > proletariatThresh){
								increment += 2 * matchPercentage;
							}
						}
						
						//final calculation
						for (var k = prev; k < splitKeys.length; k++) {
							matchPercentage = compareWords(splitKeys[k], queryWords[j]);		
							if(matchPercentage > proletariatThresh && k >= prev) {
								prev = k;
								counts[i] += increment * matchPercentage;
								splitKeys.splice(k, 1);
								break;
							}
						}
					}
				}

				var countsAndKeys = _.zip(counts, allKeys);
				countsAndKeys = _.sortBy(countsAndKeys, function(blaze){
					return blaze[0];
				});
				countsAndKeys.reverse();

				var matchThreshold = 0.4;
				var variance = 2;
				var bestKeyCounts = [];
				var bestKeyMatches = [];
				for(var i = 0; i < 3; i++){
					if(countsAndKeys[i][0] < matchThreshold){
						break;
					}
					//has to have a score within the variance of the maximum match
					if (Math.abs(countsAndKeys[0][0] - countsAndKeys[i][0]) < variance) {
						bestKeyMatches.push(countsAndKeys[i][1]);
						bestKeyCounts.push(countsAndKeys[i][0]);						
					}
				}

				if(bestKeyMatches.length != 0){
					//this is the random key
					var yolo = Math.floor(Math.random() * bestKeyMatches.length);

					//first get total of all prob
					var totalProb = 0;
					for (var i = 0; i < bestKeyCounts.length; i++) {
						totalProb += bestKeyCounts[i];
					}
					var weightedRandom = Math.floor(Math.random() * totalProb);

					//by the end of this, yolo must be the index of weighted random
					for (var i = 0; i < bestKeyCounts.length; i++) {
						if (i == 0) {
							if (weightedRandom <= bestKeyCounts[0]) {
								yolo = i;
								break;
							}
						} else if (i == 1) {
							if (weightedRandom > bestKeyCounts[0] && weightedRandom <= (bestKeyCounts[0] + bestKeyCounts[1])) {
								yolo = i;
								break;
							}	
						} else if (i == 2) {
							if (weightedRandom > (bestKeyCounts[0] + bestKeyCounts[1]) && weightedRandom <= totalProb) {
								yolo = i;
								break;
							}
						}
					}

					console.log('total score ', totalProb);

					var keyToJuice = bestKeyMatches[yolo];
					console.log('best key:', bestKeyMatches[0]);
					console.log('best key score:', bestKeyCounts[0]);
					console.log('selected key: ', keyToJuice);
					console.log('selected key score: ', bestKeyCounts[yolo]);
				} else{
					console.log('could not find match, going to random');
				}

			}

			//all else fails pick random from all possible responses
			if (!juiced[keyToJuice] || juiced[keyToJuice].length == 0 || juiced[keyToJuice][0].length == 0) {
				keyToJuice = _.sample(Object.keys(juiced));
			}

			postJuice(keyToJuice);
			$scope.answer = '';
		}
	};

	// puts ding's response on the site
	function postJuice (keyToJuice) {
		var possRespon = juiced[keyToJuice];

		var interval = 0;
		var responseToPost = Math.floor(Math.random() * possRespon.length);

		// say everything in key list
		for (var i = 0; i < possRespon[responseToPost].length; i++) {
			interval += randomizer(possRespon[responseToPost][i]);

			$timeout(function() {
				var georgeTemplate = _.template($('#george-template').html());
				$('.chat-padding-bottom').before( georgeTemplate( {response: possRespon[responseToPost].shift()} ) );

				var fbsound = new Audio('fb.mp3');
				fbsound.play();

				document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;

				if(possRespon[responseToPost].length == 0){
					possRespon.splice(responseToPost, 1);
					document.getElementById('text-input').disabled = false;
					document.getElementById('text-input').focus();
					if(possRespon.length == 0){
						delete juiced[keyToJuice];
					}
				}

			}, interval);
		}
	}

	//sets interval of his posts based on the length of his response.
	function randomizer (word) {
		return Math.floor((Math.random() * 800) + word.length*55); //used to be +200
	}
}