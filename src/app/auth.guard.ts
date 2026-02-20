import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    return true; // Deixa passar
  } else {
    router.navigate(['/login']); // Bloqueia e redireciona
    return false;
  }
};