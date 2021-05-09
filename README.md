# AngularDirectivesLearning
Use directives to modify the dom

## Two types of directives
 ### Structural Directives
    Modify the Structure of the Dom by adding or removing dom elements
    prefix * when using Structural directives
 ### Attribute
    Modify the Attribute of Dom elements   
## ngFor
 one of the built in directives in angular we used to rendering lists

`app.component.ts`
```js
 products=[
    {id:1,name:'Apple'},
    {id:2,name:'Banana'},
    {id:3,name:'Grape'}
  ]
```
`app.component.html`
```html
<ul>
  <li *ngFor="let product of products">
    {{product.name}}
  </li>
</ul>
```
- this ngFor directives exports bunch of values that might help us to build certain feauture
- imagine we render a table we want highlight a first row or last row or even row or odd row or we want disppaly an index these are the exported values from ng-directives
```html
<ul>
    <!-- one of the exported values is index alias as i -->
    <!-- index is number type -->
    <!-- all others are boolean type so we use ngIf to render table as even in some color...   -->
  <li *ngFor="let product of products;index as i">
    {{i}}-{{product.name}}
  </li>
</ul>
```html
<ul>
    <!-- one of the exported values is index alias as i -->
    <!-- index is number type -->
    <!-- all others are boolean type so we use ngIf to render table as even in some color...   -->
  <li *ngFor="let product of products;index as i even as isEven">
    {{i}}-{{product.name}} <span *ngIf='isEven'>EVEN</span>
  </li>
</ul>

```
**Reference for ngForOf**
here we can see the exported values
https://angular.io/api/common/NgForOf

## ngFor and Change Detection
    how ngFor directives response to the  changes in the components state

## ngFor trackBy
```js
productsTwo;
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
```
```html
<h2>Simulating Rendering data from external apis</h2>
<button (click)="loadProducts()">Add Item</button>
<ul>
  <!-- trackProduct is function reference use this for large objects every time redownloading data its compares if object has same id it wont redownload -->
  <li *ngFor="let product of productsTwo;trackBy:trackProduct">
    {{product.name}}  
  </li>
</ul>
```
## ngIf
    there are times we want to show or hide part of a page depending on some condition
    - if condition evaluates true element will be added to the dom otherwise removed from dom.
**NOTE**
    After seen the below examples navigate to `app.module.ts` and `app.component.html`

`app.component.html`
older approach
```html
    <div *ngIf="courses.length > 0">
        List of Courses
    </div>
    <div *ngIf="courses.length ===0">
    no courses
    </div>
```
modern approach
```html
    <div *ngIf="courses.length > 0; else noCourses">
        List of Courses
    </div>
    <!-- #tempplateVariable -->
    <ng-template #noCourses> 
    no courses
    </ng-template>
```
modern approach 2
```html
    <div *ngIf="courses.length > 0; then courseList else noCourses"></div>
     <ng-template #courseList> 
        list of courses
    </ng-template>
    <!-- #tempplateVariable -->
    <ng-template #noCourses> 
    no courses
    </ng-template>
```
another approach to hide elements using html hidden attribute in html
but this approach will not remove element from dom

```html
<!-- if false means show true means hidden indirectly -->
<div [hidden]="courses.length === 0"> 
        List of Courses
    </div>
    <div [hidden]="courses.length >0">
    no courses
    </div>
```
## ngSwitchCase
its is similar to switch case in other programming languages
- with this we can conditionaly render elements
- we can use this to build tabs
- we can also we ngIf but it evaluates only boolean values
- so there are some situations we need this 
```html
<ul class="nav nav-pills">
  <li class="nav-item "><a href="" class="nav-link active">Map View</a></li>
  <li class="nav-item"><a href="" class="nav-link">List View</a></li>
</ul>
<div>
  <div>Map View Content</div>
  <!-- <div>List View Content</div> -->
```
`app.componnent.ts`
```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  courses=["C","C++"];
  // courses=[];
  viewMode="map";
  title = 'angular-directives-learning';
}

```
`app.componnent.html`
```html
<ul class="nav nav-pills">
  <!-- [class.active] class binding -->
  <li class="nav-item "><a  class="nav-link" [class.active]="viewMode=='map'" (click)="viewMode='map'">Map View</a></li>
  <li class="nav-item"><a  class="nav-link" [class.active]="viewMode=='list'" (click)="viewMode='list'">List View</a></li>
</ul>
<!-- rendering part based on above click events -->

<!-- [ngSwitch] is default directive and this is called property binding  -->
<div [ngSwitch]="viewMode">
  <!-- if viewMode="map" -->
  <div *ngSwitchCase="'map'">Map View Content</div>
  <div *ngSwitchCase="'list'">List View Content</div>
  <div *ngSwitchDefault>something went wrong</div>
</div>
```
**References**
https://angular.io/api/common/NgSwitch

## The Leading Asterisk
When we use leading asterisk with our structural directives like `*ngIf *ngFor ngSwitchCase` angular is going to re-write that block into `ng-template`
- we can also write ng-template way but it much easier to use leading asterisk. let angular do the hard work
- if we use 
```html
<div *ngIf="courses.length > 0; else noCourses">
        List of Courses
    </div>
    <!-- #tempplateVariable -->
    <ng-template #noCourses> 
    no courses
    </ng-template>
```
- behind the scene angular does 
```html
<!-- property binding -->
<ng-template [ngIf]="courses.length > 0">
    <!-- it wraps the above ngIf div like this -->
    <div>
        List of Courses
    </div>
</ng-template>
    <!-- #tempplateVariable -->
    <ng-template [ngIf]="!(courses.length > 0)"> 
    no courses
    </ng-template>
```
## ngClass
why we should use ngClass when we have property binding
- here we can see setting class attribute makes so noisy here
```html
<span class="glyphicon" 
[class.glyphicon-star]=isSelected
[class.glyphicon-star-empty]=!isSelected
></span>
<button class="btn btn-success" (click)="toggleFavourite()"> {{isSelected ? "Un Favourite me)":"Favourite me"}}</button>
```

**using ngClass**
- its an example of attribute directive we use this to modify attribute of existing dom elements
```html
<span class="glyphicon"
[ngClass]="{
'glyphicon-star':isSelected,
'glyphicon-star-empty':!isSelected
}"
></span>
<button class="btn btn-success" (click)="toggleFavourite()"> {{isSelected ? "Un Favourite me)":"Favourite me"}}</button>
```
## ngStyle
ngStyle is also called attribute directive
- below example we have 3 style bindings
```html
<button
    [style.backgroundColor]="canSave ? 'green':'gray'"
    [style.color]="canSave ? 'white' : 'black'"
    [style.fontWeight]="canSave ?'bold' :'normal'"
>save</button>
```
- when we deal with multiple styles we need to clean up this with 
**ngStyle** directive
```html
<button
    [ngStyle]="{
        'backgroundColor':canSave ? 'green':'gray',
        'color':canSave ? 'white' : 'black',
        'fontWeight':canSave ?'bold' :'normal,
    }"
>save</button>
- but some time we need to encapsulate this using class and render it
```
## Safe Traversal operator
- what if run-time any of the objects property getting returned as undefined
- how to handle this type of error
thats why we use `?` `safe traversal operator`
```html
<!-- this is also one approach but this is not safe traversal operator -->
<!-- what it does means it doesnt have value it not even generate the tag -->
<span *ngIf="task.assignee">{{task.assignee.name}}</span>
```

another approach using safe traversal operator
```html
<!-- this will craete tag but not render the value of name if its undefined and we dont get any error on console -->
<span>{{task.assignee?.name}}</span>
```

`ts file`
```js
task={
    title:"some",
    assignee:{
        name:'some Name'
    }
}
```

# custom directive
there are times we want control over behaviour of dom elements
like input field to get value then out of focus get converted to uppercase or lowercase or format phone number

`ng g d input-format`

```ts
import { Directive } from '@angular/core';

@Directive({
  selector: '[appInputFormat]'
  // this selector has sqaure barckets which basically means any element that has this attribute 
  // appInputFormat
  //  if angular finds an element with this attribute its going to apply this directive on that element
})
export class InputFormatDirective {

  constructor() { }

}
```
-  here we want to add 2 dom events focus and blur
- import HostListener from core this decorator allows us to subscribe to the events raised from the dom elements that is the dom element hosting this directive

`input-format.directive.ts`
```ts
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appInputFormat]'
  // this selecto has sqaure barckets which basically means any element that has this attribute 
  // appInputFormat
  //  if angular finds an element with this attribute its going to apply this directive on that element
  
  //  here we want to add 2 dom events focus and blur
})
export class InputFormatDirective {
  // @Input('format') format;
  @Input('appInputFormat') format;

  constructor(private el:ElementRef) { }
// eventName when to call
  @HostListener('focus') onFocus() {
    console.log("on Focus");
    
  }

  @HostListener('blur') onBlur() {
    console.log("on Blur");
    let value:string=this.el.nativeElement.value;
    if (this.format=='lowercase')
      this.el.nativeElement.value=value.toLowerCase();
    else
    this.el.nativeElement.value=value.toUpperCase();

  }
  
}
```

`app.component.html`
```html
<h2>appInputFormat directive</h2>
<!-- <input type="text" appInputFormat> -->
<!-- <input type="text" appInputFormat [format]="'uppercase'"> -->
<input type="text" [appInputFormat]="'uppercase'"> 
```

# Zippy component
- define component api
- `app.component.html`
```html
<!-- we know input property in our custom component -->
  <zippy title="Shipping Details"> 
      Shipping Details Contents
  </zippy>
```
`zippy.component.ts`
```ts
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'zippy',
  templateUrl: './zippy.component.html',
  styleUrls: ['./zippy.component.css']
})
export class ZippyComponent {
  @Input('title') title:string;
  // isExpanded:boolean =true;
  isExpanded:boolean;

  toggle() {
    this.isExpanded=!this.isExpanded;
  }
 
}
```

`zippy.component.html`
```html
<div class="zippy">
    <div class="zippy-heading"
        [class.expanded]="isExpanded"
        (click)="toggle()"
    >
        {{title}}
        <span class="glyphicon"
            [ngClass]="{
                'glyphicon-chevron-up':isExpanded,
                'glyphicon-chevron-down':!isExpanded
            }"
        ></span>
    </div>
    <div *ngIf="isExpanded" class="zippy-body">
        <!-- inject markup from outside at runtime -->
        <ng-content></ng-content>
    </div>
</div>
```
`zippy.component.css`

```css
.zippy {
    border: 1px solid #ccc;
    border-radius: 2px;
}
.zippy-heading {
    font-weight: bold;
    padding: 20px;
    cursor: pointer;
}
.zippy-body {
    padding: 20px;

}
.expanded {
    background-color: #f0f0f0;
}
.glyphicon {
    float: right;
}
```
ScreenShot :

![alt text](https://github.com/deepakkumar07-debug/angular-directives-learning/blob/main/src/assets/1.png "screenshot")