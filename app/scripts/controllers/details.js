'use strict';

angular.module('runNbuyApp')
.controller('DetailsCtrl', function(Auth, $scope, Ref, $stateParams){
  var user = Auth.$getAuth();
 
