import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LearnMoreComponent } from './components/learn-more/learn-more.component';
import { AboutMeComponent } from './components/about-me/about-me.component';

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

  // API ROUTES

  {
    path: 'api/user/register',
    component: RegisterComponent,
  },

  // REDIRECT TO HOME IF NO ROUTE

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
