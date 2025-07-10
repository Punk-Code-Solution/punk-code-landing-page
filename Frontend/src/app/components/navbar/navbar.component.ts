import { Component, ElementRef, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ResponsiveMenuButtonComponent } from '../responsive-menu-button/responsive-menu-button.component';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [
    RouterLink,
    ResponsiveMenuButtonComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  navbarClass = signal('inactive');

  menuButtonClick(currentState: string) {
    if (currentState === 'menu') {
      this.navbarClass.set('inactive');
    } else {
      this.navbarClass.set('active');
    }
  }
}
