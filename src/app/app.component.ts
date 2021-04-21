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
  products=[
    {id:1,name:'Apple'},
    {id:2,name:'Banana'},
    {id:3,name:'Grape'}
  ]
  title = 'angular-directives-learning';
}
