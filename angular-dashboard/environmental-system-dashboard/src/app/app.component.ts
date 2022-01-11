import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'environmental-system-dashboard';
  isSideNavOpen = false;


  onSideNavOpen(){
    this.isSideNavOpen = true;
  }

  onSideNavClose(){
    this.isSideNavOpen = false;
  }

}
