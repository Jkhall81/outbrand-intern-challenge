import { CanActivateFn } from '@angular/router';
// wasn't able to access localstorage without this
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // Check if running in a browser environment
  if (isPlatformBrowser(PLATFORM_ID)) {
    const userEmail = localStorage.getItem('userEmail');

    if (userEmail) {
      return true;
    } else {
      console.log('User not authenticated, Redirecting to home');
      return false;
    }
  } else {
    // Server-side logic if needed
    console.log('Running on the server, handle accordingly');
    return false; // Or handle server-side logic if needed
  }
};
