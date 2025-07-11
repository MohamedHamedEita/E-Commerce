import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

export const adminGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  try {
    const user = await firstValueFrom(authService.getCurrentUser());

    if (user.data && user.data.role === 'admin') {
      return true;
    } else {
      return router.parseUrl('/unauthorized');
    }
  } catch (err) {
    // In case of error (e.g., not logged in), redirect too
    return router.parseUrl('/login');
  }
};
