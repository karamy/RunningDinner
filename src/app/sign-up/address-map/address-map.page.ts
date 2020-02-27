import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-address-map',
  templateUrl: './address-map.page.html',
  styleUrls: ['./address-map.page.scss'],
})
export class AddressMapPage implements OnInit {
  

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    this.authService.login();
    this.router.navigateByUrl('/home/tabs/rooms');
  }

  public getMapImage() {
    return `https://maps.googleapis.com/maps/api/staticmap?center=44.55077,7.71922&zoom=16&size=500x500&maptype=roadmap
    &markers=color:red%7Clabel:Place%7C44.55077,7.71922
    &key=${environment.googleMapsAPIKey}`;
  }

}
