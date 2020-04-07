import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { tap, switchMap, filter, take, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
// NB Per come funziona ora l'interceptor, non è previsto ricevere una risposta negativa
// da rotta /refresh, bisogna gestire la cosa dentro AuthService.refreshToken()
export class TokenInterceptorService implements HttpInterceptor {

  // Variabili utilizzate dal meccanismo di re-login automatico
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService) { }

  // Metodo richiamato in automatico da Angular per compiere azioni poco prima che la chiamata parta
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.isUserAuthenticated()) {
      request = this.addToken(request, this.authService.getUserToken());
    }
    return next.handle(request).pipe(catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        // Gestione scadenza del token
        return this.handle401Error(request, next);
      } else {
        // Se qualsiasi altro errore lo rilancio (non dovrebbe mai arrivare qui)
        return throwError(error);
      }
    }));
  }

  // Gestione errore http 401 (unauthorized) per token scaduto
  handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true; // Imposto semarofo per impedire alle altre richieste di proseguire
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((res: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(res);
          return next.handle(this.addToken(request, res.accessToken));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(res => {
          return next.handle(this.addToken(request, res.accessToken));
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
