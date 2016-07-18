namespace moduleFirstDemo {
    'use strict';

    export interface IDataProductFactory {
        getProducts:()=> ng.IPromise<moduleFirstDemo.domain.IProduct[]>;
        saveProduct:(product:moduleFirstDemo.domain.IProduct)=> ng.IPromise<moduleFirstDemo.domain.IProduct>;
        updateProduct:(product:moduleFirstDemo.domain.IProduct)=> ng.IPromise<moduleFirstDemo.domain.IProduct>;
        deleteProduct:(productId:number)=> ng.IPromise<any>;
    }
    export class DataProductFactory implements IDataProductFactory {
        static $inject: Array<string> = ['$http'];
        constructor(private $http: ng.IHttpService) {}

        getProducts(): ng.IPromise<moduleFirstDemo.domain.IProduct[]>{
            return this.$http.get('http://localhost:3000/products')
            .then((response:ng.IHttpPromiseCallbackArg<moduleFirstDemo.domain.IProduct[]>):
                moduleFirstDemo.domain.IProduct[] =>{
                    return <moduleFirstDemo.domain.IProduct[]> response.data;
                });
        }

        saveProduct(product:moduleFirstDemo.domain.IProduct): ng.IPromise<moduleFirstDemo.domain.IProduct>{
            return this.$http.post('http://localhost:3000/products',product)
            .then((response:ng.IHttpPromiseCallbackArg<moduleFirstDemo.domain.IProduct>):
                moduleFirstDemo.domain.IProduct =>{
                    return <moduleFirstDemo.domain.IProduct> response.data;
                });
        }

        updateProduct(product:moduleFirstDemo.domain.IProduct): ng.IPromise<moduleFirstDemo.domain.IProduct>{
            return this.$http.put('http://localhost:3000/products/' + product.id,product)
            .then((response:ng.IHttpPromiseCallbackArg<moduleFirstDemo.domain.IProduct>):
                moduleFirstDemo.domain.IProduct =>{
                    return <moduleFirstDemo.domain.IProduct> response.data;
                });
        }

        deleteProduct(productId:number): ng.IPromise<any>{
            return this.$http.delete('http://localhost:3000/products/' + productId)
            .then((response:ng.IHttpPromiseCallbackArg<any>):
                any =>{
                    return <any> response.data;
                });
        }
    }

    function factory($http:ng.IHttpService):IDataProductFactory {
        return new DataProductFactory($http);
    }

    angular
        .module('demoModule')
        .factory('DataProductFactory', factory);
}