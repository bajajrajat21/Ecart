'use strict';
angular.module('Ecart')
    .controller('CartViewCtrl', [
        "$scope",
        "dataService",
        function($scope, dataService) {
            $scope.cart = dataService.cart;
            $scope.totalPrice = 0;
            $scope.remove = function(item) {
                dataService.removeFromCart(item);
                $scope.calculateTotalPrice();
            };

            $scope.calculateTotalPrice = function() {
                $scope.totalPrice = 0;
                for (var i = 0; i < $scope.cart.length; i++) {
                    $scope.totalPrice += ($scope.cart[i].price * $scope.cart[i].count)
                }
            };

            $scope.calculateTotalPrice();
        }
    ]);