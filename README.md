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
```
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
## ngClass
## ngStyle
## Building Custom Directives
