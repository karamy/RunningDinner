import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

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

}
