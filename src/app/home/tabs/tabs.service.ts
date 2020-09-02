import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class TabsService {

  private hideTabBarPages: string[] = [ // Dichiaro le pagine nelle quali voglio nascondere le tabs
    'dinner-detail',
    'dinner-event',
    'dinner-phases'
  ];

  constructor(private router: Router, private platform: Platform) {
    this.platform.ready().then(() => {
      this.navEvents();
    });
  }

  // Mi subscribo all'evento NavigationEnd per capire quando la navigazione sulle pagine dichiarate
  navEvents() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.showHideTabs(e);
      });
  }

  // Ottengo il nome della pagina aperta (page) e controllo se presente in hideTabBarPages
  showHideTabs(e: NavigationEnd) {
    const urlArray = e.url.split('/');
    const pageUrl = urlArray[urlArray.length - 1];
    const page = pageUrl.split('?')[0];
    const shouldHide = this.hideTabBarPages.indexOf(page) > -1;
    shouldHide ? this.hideTabs() : this.showTabs();
  }

  // Nascondo le tabs
  public hideTabs() {
    const tabBar = document.getElementById('myTabBar');
    if (tabBar.style.display !== 'none') tabBar.style.display = 'none';
  }

  // Mostro le tabs
  public showTabs() {
    const tabBar = document.getElementById('myTabBar');
    if (tabBar.style.display !== 'flex') tabBar.style.display = 'flex';
  }
}
