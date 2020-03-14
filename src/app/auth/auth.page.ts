import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() { }

  loginToRooms() {
    const phoneNumber = '+393408552105';

    this.authService.doLogin(phoneNumber).then(() => {
      this.router.navigateByUrl('/home/tabs/rooms');
    }, (err) => {
      alert('errore login');
    });
  }
}
