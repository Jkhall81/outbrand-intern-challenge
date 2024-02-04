import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('userEmail')) {
    console.log('user is logged in');
    return true;
  } else {
    console.log('user is not logged in.');
    return false;
  }
};
