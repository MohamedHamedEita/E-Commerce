import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const noAuthGuard: CanActivateFn = (route, state) => {
  let _Router = inject(Router);
  if (!localStorage.getItem('userToken')) {
    return true;
  } else {
    _Router.navigate(['/home']);
    return false;
  }
};
