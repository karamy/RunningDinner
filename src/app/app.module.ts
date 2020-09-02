import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import { TokenInterceptorService } from "./token-interceptor.service";
import { Diagnostic } from "@ionic-native/diagnostic/ngx";
import { Contacts } from "@ionic-native/contacts";
import { RDModalsModule } from './rdmodals/rdmodals.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('capacitor-pwa-firebase-msg-sw.js', { enabled: true }), // Registrazione service-worker per utilizzo plugin push da web
    RDModalsModule, // Importo qui il modulo dei modali per caricare gli entryComponents utilizzati in tutta l'app
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AndroidPermissions, // Devo aggiungere nei provider il plugin di Ionic Native
    Diagnostic,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    Contacts,
    LaunchNavigator
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
