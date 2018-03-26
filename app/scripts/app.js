var app = angular.module('Ecart', ['ui.router']);
app.config([
    "$stateProvider", 
    "$urlRouterProvider",
    function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('root', {
            url: '/',
            templateUrl: 'views/listView/listView.html',
            controller: 'ListViewCtrl'
        })
        .state('about', {
            url: "/cart",
            templateUrl: 'views/cartView/cartView.html',
            controller: 'CartViewCtrl'
        });

    $urlRouterProvider.otherwise('/');
}]);