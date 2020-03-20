import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthService
  ) {
    this.initializeApp();

    // Verifica login attivo
    this.checkActiveLogin();
  }

  initializeApp() {
    this.statusBar.styleDefault();
    this.splashScreen.hide();
  }

  // Verifica se lo user è autenticato e ridirige verso opportuna rotta
  checkActiveLogin() {
    if (this.authService.isUserAuthenticated()) {
      this.router.navigateByUrl('/home');
    } else {
      // this.router.navigateByUrl('/auth/phone'); TODO sarà da mettere questo
      this.router.navigateByUrl('/auth');
    }
  }
}
