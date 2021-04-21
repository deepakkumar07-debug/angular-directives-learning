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

## ngIf
    there are times we want to show or hide part of a page depending on some condition
    - if condition evaluates true element will be added to the dom otherwise removed from dom.
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
## ngSwitchCase
## ngClass
## ngStyle
## Building Custom Directives
