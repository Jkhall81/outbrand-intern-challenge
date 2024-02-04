import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DockModule } from 'primeng/dock';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DockModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'outbrand-webcam';
  items: MenuItem[] | undefined;
  private authSubscription: Subscription | undefined;

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        command: () => this.router.navigate(['/home']),
        tooltipOptions: {
          tooltipLabel: 'Home',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 300,
        },
        icon: 'https://cdn-icons-png.flaticon.com/512/1177/1177455.png',
      },
      {
        label: 'Login',
        command: () => this.router.navigate(['/login']),
        tooltipOptions: {
          tooltipLabel: 'Login',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 300,
        },
        icon: 'https://cdn-icons-png.flaticon.com/512/6681/6681204.png',
      },
      {
        label: 'Register',
        command: () => this.router.navigate(['/register']),
        tooltipOptions: {
          tooltipLabel: 'Register',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 300,
        },
        icon: 'data:image/jpeg;base64,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',
      },
      {
        label: 'Webcam Demo',
        command: () => this.router.navigate(['/webcam-demo']),
        tooltipOptions: {
          tooltipLabel: 'Webcam Demo',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 300,
        },
        icon: 'https://cdn-icons-png.flaticon.com/512/1541/1541080.png',
      },
      {
        label: 'Logout',
        command: () => this.authService.logout(),
        tooltipOptions: {
          tooltipLabel: 'Logout',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 300,
        },
        icon: 'https://cdn-icons-png.flaticon.com/512/4400/4400483.png',
      },
    ];
  }
}
