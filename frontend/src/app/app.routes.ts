import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LearnMoreComponent } from './components/learn-more/learn-more.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { RecordRtcComponent } from './components/record-rtc/record-rtc.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'learn-more',
    component: LearnMoreComponent,
  },
  {
    path: 'about-me',
    component: AboutMeComponent,
  },
  {
    path: 'webcam-demo',
    component: RecordRtcComponent,
    canActivate: [authGuard],
  },
  // REDIRECT TO HOME IF NO ROUTE

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
