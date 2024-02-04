import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router) {}

  redirectToLearnMore(): void {
    this.router.navigate(['/learn-more']);
  }

  redirectToAboutMe(): void {
    this.router.navigate(['/about-me']);
  }
}
