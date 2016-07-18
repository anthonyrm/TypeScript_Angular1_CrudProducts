var moduleFirstDemo;
(function (moduleFirstDemo) {
    'use strict';
    var DataProductFactory = (function () {
        function DataProductFactory($http) {
            this.$http = $http;
        }
        DataProductFactory.prototype.getProducts = function () {
            return this.$http.get('http://localhost:3000/products')
                .then(function (response) {
                return response.data;
            });
        };
        DataProductFactory.prototype.saveProduct = function (product) {
            return this.$http.post('http://localhost:3000/products', product)
                .then(function (response) {
                return response.data;
            });
        };
        DataProductFactory.prototype.updateProduct = function (product) {
            return this.$http.put('http://localhost:3000/products/' + product.id, product)
                .then(function (response) {
                return response.data;
            });
        };
        DataProductFactory.prototype.deleteProduct = function (productId) {
            return this.$http.delete('http://localhost:3000/products/' + productId)
                .then(function (response) {
                return response.data;
            });
        };
        DataProductFactory.$inject = ['$http'];
        return DataProductFactory;
    }());
    moduleFirstDemo.DataProductFactory = DataProductFactory;
    function factory($http) {
        return new DataProductFactory($http);
    }
    angular
        .module('demoModule')
        .factory('DataProductFactory', factory);
})(moduleFirstDemo || (moduleFirstDemo = {}));

//# sourceMappingURL=dataProductFactory.js.map
