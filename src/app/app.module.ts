import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ContactsDetailPage } from "./home/tabs/contacts/contacts-detail/contacts-detail.page";
import { CountryCodesPage } from "./auth/phone/country-codes/country-codes.page";
import { CountryCodesPageModule } from "./auth/phone/country-codes/country-codes.module";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import { TokenInterceptorService } from "./token-interceptor.service";
import { Diagnostic } from "@ionic-native/diagnostic/ngx";
import { Contacts } from "@ionic-native/contacts";
import { BadgeComponentModule } from "./home/badge/badge.component.module";

@NgModule({
  declarations: [AppComponent, ContactsDetailPage],
  entryComponents: [ContactsDetailPage, CountryCodesPage], // Classi caricate all'avvio perchè gestite da ModalController
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    CountryCodesPageModule,
    BadgeComponentModule,
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
