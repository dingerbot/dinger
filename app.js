function dingerController($scope) {

	$scope.hitEnter = function () {
		$scope.ding = "\"fuck u\"";
		document.getElementById('text-input').blur();
	};



}