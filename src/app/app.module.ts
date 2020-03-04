import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ContactsDetailPage } from './home/tabs/contacts/contacts-detail/contacts-detail.page';
import { CountryCodesPage } from './auth/phone/country-codes/country-codes.page';
import { CountryCodesPageModule } from './auth/phone/country-codes/country-codes.module';

@NgModule({
  declarations: [AppComponent, ContactsDetailPage],
  entryComponents: [ContactsDetailPage, CountryCodesPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, CountryCodesPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
