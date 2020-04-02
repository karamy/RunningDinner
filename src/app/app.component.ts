import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from './auth/auth.service';
import { PermissionsService } from './auth/permissions.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthService,
    private permissionService: PermissionsService,
    private platform: Platform
  ) {
    this.initializeApp();

    // Verifica login attivo
    this.checkActiveLogin();
  }

  initializeApp() {
    // Attivo configurazioni statusBar e splashScreen solo su dispositivo
    // in modo da non dare warning all'avvio
    if (this.platform.is('cordova')) {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    }
  }

  // Verifica se lo user è autenticato e ridirige verso opportuna rotta
  async checkActiveLogin() {
    if (this.authService.isUserAuthenticated()) {
      // Verifico se utente ha disabilitato le permissions a login attivo
      try {
        await this.permissionService.hasGpsPermission();
        await this.permissionService.hasNotificationPermission();
      } catch (e) {
        console.log("Login attivo ma permission non date");
        this.router.navigateByUrl('/auth/geolocation');
        return;
      }

      // Se arrivo qui possiedo entrambe le permission, vado in home
      console.log("Login attivo e permission date, proseguo");
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/auth');
    }
  }
}
