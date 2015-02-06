'use strict';
;app.controller('controller',function($scope,$http){
	$http.get('personalInfo.json').success(function(data){
		$scope.personalInfos = data;
		console.log($scope.personalInfos)
	});
});