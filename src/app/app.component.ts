import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MathPlayOpen';
  showSidebar: boolean = false;
  load:any =null
  ngOnInit():void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // @ts-ignore
        this.showSidebar = event.url !== '/sign-up' && event.url !== '/sign-in' && event.url !== '/password-recovery' && event.url !== '/' && event.url !== '/login/:id/:role';
        if (this.showSidebar) {
          this.load=1;
        }else {
          this.load=0;
        }
      }
    });

  }
  constructor(private router: Router) {

  }
}
