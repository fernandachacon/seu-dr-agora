import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID); // Identifica se é navegador ou servidor
  const isBrowser = isPlatformBrowser(platformId);

  let token: string | null = null;

  // Só tenta ler o token se estiver no navegador
  if (isBrowser) {
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
        // Só tenta limpar o storage e navegar se estiver no navegador
        if (isBrowser) {
          localStorage.removeItem('token');
          router.navigate(['/login']);
        }
      }
      return throwError(() => error);
    })
  );
};