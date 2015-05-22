'use strict';
/**
 * @ngdoc function
 * @name runNbuyApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('runNbuyApp')
  .controller('LoginCtrl', function ($scope, Auth, $state, Ref, $timeout, SweetAlert) {
    $scope.oauthLogin = function(provider) {
      $scope.err = null;
      Auth.$authWithOAuthPopup(provider, { rememberMe: true })
      .then(redirect).catch(function(error) {
        showError(error);
      });
    };

    $scope.anonymousLogin = function() {
      $scope.err = null;
      Auth.$authAnonymously({ rememberMe: true })
      .then(redirect).catch(function(error) {
        $scope.loading = false;
        showError(error);
      });
    };

    $scope.passwordLogin = function(user) {
      $('#loginButton').button('loading');

      Auth.$authWithPassword({ email: user.email, password: user.pass }, { rememberMe: true })
      .then(redirect).catch(function(error) {

        $('#loginButton').button('reset');
        showError(error);
        
      });
    };

    function redirect() {
      $state.transitionTo('account');
    }

    function errorText(text) {
      SweetAlert.swal({
        title: 'Error!', 
        text: text,
        type: 'error'
      });
    }

    function showError(error) {
      switch (error.code) {
        case 'INVALID_EMAIL':
          errorText('El correo introducido no es valido!');
          break;
        case 'INVALID_PASSWORD':
          errorText('La contraseña es incorrecta!');
          break;
        case 'INVALID_USER':
          errorText('Este usuario no existe!');
          break;
        default:
          errorText('Algo fue mal!');
      }
    }
});

