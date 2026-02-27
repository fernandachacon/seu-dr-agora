import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);

  let token: string | null = null;

  // 🔥 Proteção para SSR
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  let cloned = req;

  if (token) {
    cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(cloned).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.status === 401) {

        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }

        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};