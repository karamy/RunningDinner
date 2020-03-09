import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
// [Non Utilizzata] Clase in grado di intercettare i cambi di state di Angular e bloccare
// il change se l'utente non è autorizzato
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isUserAuthenticated()) {
      this.router.navigateByUrl('/auth');
    }
    return this.authService.isUserAuthenticated();
  }
}
