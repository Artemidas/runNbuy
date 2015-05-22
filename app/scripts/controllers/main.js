'use strict';

angular.module('runNbuyApp').controller('MainCtrl', function ($scope, Auth, $state) {
  	
  	$scope.logout = function() { 
  		Auth.$unauth();
      $state.go('login');
  	};
    
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
