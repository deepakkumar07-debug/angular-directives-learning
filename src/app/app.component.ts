import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  courses=["C","C++"];
  // courses=[];
  title = 'angular-directives-learning';
}
