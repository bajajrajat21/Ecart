angular.module('Ecart')
    .directive('productItem',["dataService", 
    	function(dataService) {
        return {
            scope: {
                item: '='
            },
            templateUrl: 'views/common/productItemTemplate.html',
            link: function(scope) {
                scope.addToCart = function(item) {
                    item.selected = true;
                    dataService.addToCart(item);
                }
            }
        }
    }]);