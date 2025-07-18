// src/app/Guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getCurrentUser().pipe(map((res: any) => {
      if (res && res.data) {
        authService.user.next(res.user); // Store user
        authService.isLogin.next(true); // Mark as logged in
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }),
    catchError((err) => {
      console.error('AuthGuard - error:', err);
      router.navigate(['/login']);
      return of(false);
    })
  );
};
