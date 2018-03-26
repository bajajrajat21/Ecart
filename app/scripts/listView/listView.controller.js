'use strict';

angular.module('Ecart')
    .controller('ListViewCtrl', ["$scope", "dataService", "$timeout", function($scope, dataService, $timeout) {
        $scope.products = dataService.dataObjArr;
        $scope.itemsPerPage = 6;
        $scope.pagedProducts = [];
        $scope.currentPage = 0;
        $scope.filterObj = {};
        $scope.filterArr = [];
        $scope.searchStr = "";
        $scope.noOfPagesArr = [6, 12, 18, 24];
        var timerFn;
        var backupdata = angular.copy($scope.products);
        var calculateProductsDisplayed = function() {
            if ($scope.pagedProducts[$scope.currentPage] && $scope.pagedProducts[$scope.currentPage].length) {
                $scope.itemsDisplayed = (($scope.itemsPerPage * $scope.currentPage) + $scope.pagedProducts[$scope.currentPage].length);
            }else{
                $scope.itemsDisplayed = 0 ;
            }
        }
        $scope.groupProductsToPages = function(filteredProductsArr) {
            $scope.currentPage = 0;
            $scope.pagedProducts = [];
            if (filteredProductsArr.length > 0) {
                for (var i = 0; i < filteredProductsArr.length; i++) {
                    if (i % $scope.itemsPerPage === 0) {
                        $scope.pagedProducts[Math.floor(i / $scope.itemsPerPage)] = [filteredProductsArr[i]];
                    } else {
                        $scope.pagedProducts[Math.floor(i / $scope.itemsPerPage)].push(filteredProductsArr[i]);
                    }
                }
            }
        };
        $scope.updateNoOfPages = function(noOfItemsInAPage) {
            filterProducts();
        }

        $scope.prevPage = function() {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
            calculateProductsDisplayed();
        }
        $scope.nextPage = function() {
            if ($scope.currentPage < ($scope.pagedProducts.length - 1)) {
                $scope.currentPage++;
            }
            calculateProductsDisplayed();
        }


        $scope.filters = [{
                key: "Brand",
                attr: "brand",
                choices: _.uniq($scope.products, function(product) { return product.brand; })
            },
            {
                key: "RAM",
                attr: "ram",
                choices: _.uniq($scope.products, function(product) { return product.ram; })
            },
            {
                key: "Screen",
                attr: "screen",
                choices: _.uniq($scope.products, function(product) { return product.screen; })
            },
        ];

        $scope.addToCart = function(product) {
            product.selected = true;
            dataService.addToCart(product);
        };

        $scope.filterProduct = function(attr, choiceName) {
            createFilterObj(attr, choiceName);
            filterProducts();
        }


        var createFilterObj = function(filterType, filterValue) {
            if ($scope.filterObj[filterType]) {
                var positionOfFilterValue = $scope.filterObj[filterType].indexOf(filterValue);
                if (positionOfFilterValue > -1) {
                    $scope.filterObj[filterType].splice(positionOfFilterValue, 1);
                    if ($scope.filterObj[filterType].length === 0) {
                        delete $scope.filterObj[filterType];
                    }
                } else {
                    $scope.filterObj[filterType].push(filterValue);
                }
            } else {
                $scope.filterObj[filterType] = [filterValue];
            }
            console.log($scope.filterObj);

        };

        $scope.$watch('searchStr', function(newVal, oldVal) {
            if (timerFn) {
                $timeout.cancel(timerFn);
            }
            timerFn = $timeout(function() {
                filterProducts();
            }, 1000);
        });

        $scope.filterFun = function(item) {
            return (
                ($scope.searchStr ? ((item.name.toLowerCase()).indexOf($scope.searchStr.toLowerCase()) > -1) : true) &&
                ($scope.filterObj.brand ? ($scope.filterObj.brand.indexOf(item.brand) > -1) : true) &&
                ($scope.filterObj.ram ? ($scope.filterObj.ram.indexOf(item.ram) > -1) : true) &&
                ($scope.filterObj.screen ? ($scope.filterObj.screen.indexOf(item.screen) > -1) : true)
            )
        };

        var filterProducts = function() {
            $scope.filterArr = [];
            for (var i = 0; i < $scope.products.length; i++) {
                if ($scope.filterFun($scope.products[i])) {
                    $scope.filterArr.push($scope.products[i]);
                }
            }
            $scope.groupProductsToPages($scope.filterArr);
            calculateProductsDisplayed();
            console.log($scope.filterArr);

        };
        filterProducts();
    }]);