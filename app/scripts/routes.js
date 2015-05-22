'use strict';

angular.module('runNbuyApp')
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        data: { title: 'Home' }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/user/login.html',
        controller: 'LoginCtrl',
        data: { title: 'Login' }
      })
      .state('register', {
        url: '/register',
        templateUrl: 'views/user/register.html',
        controller: 'RegisterCtrl',
        data: { title: 'Register' }
      })
      .state('chat', {
        url: '/chat',
        templateUrl: 'views/chat.html',
        controller: 'ChatCtrl'
      })
      .state('account', {
        url: '/account',
        templateUrl: 'views/user/account.html',
        controller: 'AccountCtrl',
        authenticate: true,
        data: { title: 'Mi cuenta'}
      })
      .state('articulos', {
        url: '/articulos',
        templateUrl: 'views/articles/articulos.html',
        controller: 'ArticlesCtrl',
        authenticate: true,
        data: { title: 'Articulos'}
      })
      .state('anuncios', {
        url: '/anuncios',
        templateUrl: 'views/articles/anuncios.html',
        controller: 'ArticlesCtrl',
        authenticate: true,
        data: { title: 'Anuncios'}
      })
      .state('articuloDetalles', {
        url: '/articulos/articulo/:id',
        templateUrl: 'views/articles/detallesArticulo.html',
        controller: 'ArticleCtrl',
        authenticate: true,
        data: { title: 'Articulo - Detalles'}
      })
      .state('anuncioDetalles', {
        url: '/anuncios/anuncio/:id',
        templateUrl: 'views/articles/detallesAnuncio.html',
        controller: 'AdCtrl',
        authenticate: true,
        data: { title: 'Anuncio - Detalles'}
      });
      $urlRouterProvider.otherwise('home');
  }])
  .run(['$rootScope', '$location', 'Auth', 'SECURED_ROUTES', 'loginRedirectPath', '$state',
    function($rootScope, $location, Auth, SECURED_ROUTES, loginRedirectPath, $state) {
      // watch for login status changes and redirect if appropriate
      Auth.$onAuth(check);

      // Funcion para inyectar el titulo de cada pagina
      $rootScope.$on('$stateChangeStart', function(){
        $rootScope.$state = $state;
      });

      // Verifica si el usuario se había autenticado
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        if (toState.authenticate && !Auth.$getAuth()){
          // Usuario no esta autenticado
          $state.transitionTo(loginRedirectPath);
          event.preventDefault(); 
        }
      });
      // some of our routes may reject resolve promises with the special {authRequired: true} error
      // this redirects to the login page whenever that is encountered
      $rootScope.$on('$routeChangeError', function(e, next, prev, err) {
        if( err === 'AUTH_REQUIRED' ) {
          $location.path(loginRedirectPath);
        }
      });

      function check(user) {
        if( !user && authRequired($location.path()) ) {
          $location.path(loginRedirectPath);
        }
      }

      function authRequired(path) {
        return SECURED_ROUTES.hasOwnProperty(path);
      }
    }
  ])
  // used by route security
  .constant('SECURED_ROUTES', {});
