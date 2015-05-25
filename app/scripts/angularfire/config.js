angular.module('firebase.config', [])
  .constant('FBURL', 'https://run-n-buy.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password','anonymous','facebook','google','twitter','github'])
  .constant('loginRedirectPath', 'login');
