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
  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  ngOnInit() {}

  onLogin() {
    this.authService.login();
    this.router.navigateByUrl('/home/tabs/rooms');
  }
}
