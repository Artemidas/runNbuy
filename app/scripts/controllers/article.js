'use strict';

angular.module('runNbuyApp')
.controller('ArticlesCtrl', function ($scope, Ref, Auth, $firebaseObject) {
	var user = Auth.$getAuth();

	var anuncioObject = $firebaseObject(Ref.child('ads'));
  anuncioObject.$bindTo($scope, 'anuncios');
  
  var articuloObject = $firebaseObject(Ref.child('articles'));
  articuloObject.$bindTo($scope, 'articulos');
})
.controller('ArticleCtrl', function(Auth, $scope, Ref, $stateParams, $firebaseObject){
  var user = Auth.$getAuth();

  var articuloRef = Ref.child('articles').child($stateParams.id);
  var articulo = $firebaseObject(articuloRef);

  $scope.articulo = articulo;
})
.controller('AdCtrl', function(Auth, $scope, Ref, $stateParams, $firebaseObject){
	var user = Auth.$getAuth();
	
	var anuncioRef = Ref.child('ads').child($stateParams.id);
  var anuncio = $firebaseObject(anuncioRef);

 	$scope.anuncio = anuncio;
});
