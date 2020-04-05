import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
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
    private authService: AuthService,
    private permissionService: PermissionsService,
    private platform: Platform,
    private navController: NavController
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
        this.navController.navigateRoot('/auth/geolocation');
        return;
      }

      // Se arrivo qui possiedo entrambe le permission, vado in home
      console.log("Login attivo e permission date, proseguo");
      this.navController.navigateRoot('/home');
    } else {
      this.navController.navigateRoot('/auth');
    }
  }
}
