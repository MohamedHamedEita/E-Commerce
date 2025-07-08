import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, catchError, of } from 'rxjs';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getCurrentUser().pipe(
    map((res: any) => {
      if (res && res.data) {
        // already logged in → redirect away from login/register
        router.navigate(['/home']);
        return false;
      } else {
        return true; // not logged in → allow access to login/register
      }
    }),
    catchError((err) => {
      console.warn('noAuthGuard - error or not logged in:', err);
      return of(true); // treat errors as "not logged in"
    })
  );
};