'use strict';

/**
 * @ngdoc overview
 * @name runNbuyApp
 * @description
 * # runNbuyApp
 *
 * Main module of the application.
 */
angular.module('runNbuyApp', ['ngAnimate', 'ngAria', 'ngCookies', 'ngResource', 'ngSanitize', 
                              'ngTouch', 'firebase', 'firebase.ref', 'firebase.auth',
                              'oitozero.ngSweetAlert', 'ui.router'
    ])
    /*.config(function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyDKFJUMm68GG0guIMt7d2ZMbf0hTs29REU',
            v: '3.17',
            libraries: 'places' // google.com/intl/en_US/help/terms_maps.html
        });
    })*/
    ;
