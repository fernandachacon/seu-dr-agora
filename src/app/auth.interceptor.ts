import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const router = inject(Router); // Injeta o Router dentro da função

  let cloned = req;
  if (token) {
    cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(cloned).pipe(
    catchError((error: HttpErrorResponse) => {
      // Se o erro for 401, o token provavelmente expirou
      if (error.status === 401) {
        localStorage.removeItem('token'); // Limpa o lixo
        router.navigate(['/login']);      // Manda pro login
      }
      return throwError(() => error);
    })
  );
};