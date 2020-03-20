import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { tap, switchMap, filter, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  // Variabili utilizzate dal meccanismo di re-login automatico
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthService) { }

  // Metodo richiamato in automatico da Angular per compiere azioni poco prima che la chiamata parta
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.isUserAuthenticated()) {
      request = this.addToken(request, this.authService.getUserToken());
    }

    return next.handle(request).pipe(tap(() => { }, (error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next);
      } else {
        return throwError(error);
      }
    }));
  }

  // Gestione errore http 401 (unauthorized) per token scaduto
  handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().then(() => {
        switchMap(() => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(this.authService.getUserToken());
          return next.handle(this.addToken(request, this.authService.getUserToken()));
        });
      }, () => {
        return Promise.reject('Impossibile aggiornare il token');
      });
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }

  // Aggiunge alla request il token nel Authentication header
  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
