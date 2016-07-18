var moduleFirstDemo;
(function (moduleFirstDemo) {
    'use strict';
    var ProductListController = (function () {
        function ProductListController(DataProductService, DataProductFactory) {
            var _this = this;
            this.DataProductService = DataProductService;
            this.DataProductFactory = DataProductFactory;
            this.title = "Lista de productos";
            this.showImage = false;
            this.showProgress = true;
            //var productResource=DataProductService.getProductResource();
            /*productResource.query((data:moduleFirstDemo.domain.IProduct[])=>{
                this.products=data;
            })*/
            this.DataProductFactory.getProducts().then(function (res) {
                _this.products = res;
                _this.showProgress = false;
            });
        }
        ProductListController.prototype.saveProduct = function (product) {
            var _this = this;
            this.DataProductFactory.saveProduct(product).then(function (res) {
                _this.products.push(product);
                console.log('Guardado');
            });
        };
        ProductListController.prototype.updateProduct = function (product) {
            this.DataProductFactory.updateProduct(product).then(function (res) {
                console.log('Modificado');
            });
        };
        ProductListController.prototype.deleteProduct = function (productId) {
            var _this = this;
            var index;
            this.products.some(function (ele, i) {
                if (ele.id == productId) {
                    index = i;
                    return true;
                }
            });
            this.DataProductFactory.deleteProduct(productId).then(function (res) {
                _this.products.splice(index, 1);
                console.log('Eliminado');
            });
        };
        ProductListController.prototype.toggleImage = function () {
            this.showImage = !this.showImage;
        };
        ProductListController.$inject = ['DataProductService', 'DataProductFactory'];
        return ProductListController;
    }());
    moduleFirstDemo.ProductListController = ProductListController;
    angular
        .module('demoModule')
        .controller('ProductListController', ProductListController);
})(moduleFirstDemo || (moduleFirstDemo = {}));

//# sourceMappingURL=ProductListController.js.map
