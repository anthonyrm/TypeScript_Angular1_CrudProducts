namespace moduleFirstDemo {
    'use strict';
    //alias
    import IProduct = moduleFirstDemo.domain.IProduct;
    export interface IProductListController{
        title:string;
        products:IProduct[];
        showImage:boolean;
        toggleImage():void;
        saveProduct(product:IProduct):void;
        updateProduct(product:IProduct):void;
        deleteProduct(productId:number):void;
    }
    export class ProductListController implements IProductListController {
        static $inject: Array<string> = ['DataProductService','DataProductFactory'];
        title:string;
        products:IProduct[];
        showImage:boolean;
        showProgress:boolean;

        constructor(private DataProductService: moduleFirstDemo.IDataProductService,
        private DataProductFactory:moduleFirstDemo.IDataProductFactory) {
           this.title="Lista de productos"; 
           this.showImage=false;
           this.showProgress=true;
           //var productResource=DataProductService.getProductResource();
           /*productResource.query((data:moduleFirstDemo.domain.IProduct[])=>{
               this.products=data;
           })*/
           this.DataProductFactory.getProducts().then(
               res=>{
                   this.products=res;
                   this.showProgress=false;
               }
           );
  
        }

        saveProduct(product:IProduct):void{
            this.DataProductFactory.saveProduct(product).then(
                res=>{
                    this.products.push(product);
                    console.log('Guardado');
                }
            );
        }

        updateProduct(product:IProduct):void{
            this.DataProductFactory.updateProduct(product).then(
                res=>{
                    console.log('Modificado');
                }
            );
        }

        deleteProduct(productId:number):void{
            var index;
            this.products.some((ele:IProduct, i:number)=>{
                if(ele.id == productId) {
                    index = i;
                    return true;
                }
            })
            this.DataProductFactory.deleteProduct(productId).then(
                res=>{
                    this.products.splice(index, 1);
                    console.log('Eliminado');
                }
            );
        }

        toggleImage():void{
            this.showImage=!this.showImage;
        }

    }

    angular
        .module('demoModule')
        .controller('ProductListController', ProductListController);
}