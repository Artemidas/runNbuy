'use strict';

angular.module('runNbuyApp')
  .controller('RegisterCtrl', function ($scope, Auth, $location, $q, Ref, $timeout, SweetAlert) {
    
    // Recojo lo datos de la vista y creo una cuenta para el usuario
    $scope.createAccount = function(user) {  
      if(!user.email) {
        errorText('Por favor, introduce el correo electronico!');
      } else if(!user.pass) {
        errorText('Por favor, introduce la contraseña!');
      } else if(user.pass !== user.confirm) {
        errorText('Las contraseñas no coinciden!');
      } else {
        $('#registerButton').button('loading');
        Auth.$createUser({email: user.email, password: user.pass})
        .then(function() {
          // authenticate so we have permission to write to Firebase
          return Auth.$authWithPassword({email: user.email, password: user.pass}, {rememberMe: true});
        })
        .then(createProfile)
        .then(redirect)
        .catch(function(error) {
          $('#registerButton').button('reset');
          showError(error);
        });
      }

      function createProfile(user) {
        var ref = Ref.child('users').child(user.uid), def = $q.defer();
        ref.set({
          email: user.email, 
          name: firstPartOfEmail(user.email),
          date: new Date()
        }, function(err) {
          $timeout(function() {
            if( err ) {
              def.reject(err);
            } else {
              def.resolve(ref);
            }
          });
        });
        return def.promise;
      }
    };

    function firstPartOfEmail(email) {
      return ucfirst(email.substr(0, email.indexOf('@'))||'');
    }

    function ucfirst (str) {
      // inspired by: http://kevin.vanzonneveld.net
      str += '';
      var f = str.charAt(0).toUpperCase();
      return f + str.substr(1);
    }

    function redirect() {
      $location.path('/account');
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
        case 'EMAIL_TAKEN':
          errorText('Este usuario ya existe!');
          break;
        case 'NETWORK_ERROR':
          errorText('Verifica tu conexión de Internet!');
          break;
        default:
          errorText('Algo fue mal!');
      }
    }
});
