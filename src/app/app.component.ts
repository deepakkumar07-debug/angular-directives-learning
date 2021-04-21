import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-directives-learning';

  courses=["C","C++"];
  // courses=[];
  viewMode="map";

  products=[
    {id:1,name:'Apple'},
    {id:2,name:'Banana'},
    {id:3,name:'Grape'}
  ];
  productsTwo;
  productsLength=this.products.length;
  onAdd(){
    let count=this.productsLength+1;
    this.products.push({id:count,name:`product ${(count)}`});
    console.log(this.products);
    
  }
  onRemove(product){
    console.log(product);
    let index=this.products.indexOf(product);
    this.products.splice(index,1)//we go to that index and delete one object
  }

  onChange(product){
    product.name="bought";
  }
  loadProducts(){
    this.productsTwo=[
      {id:1,name:'Apples'},
    {id:2,name:'Bananas'},
    {id:3,name:'Grapes'}
    ]
  }
  trackProduct(index,product){
     return product ? product.id :undefined;
  }
}
