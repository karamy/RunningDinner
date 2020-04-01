import { Component, OnInit } from '@angular/core';
import { SignupService } from '../signup-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-username',
  templateUrl: './username.page.html',
  styleUrls: ['./username.page.scss'],
})
export class UsernamePage implements OnInit {

  username: string;

  constructor(private signupService: SignupService, private router: Router) { }

  ngOnInit() {
    this.username = null;
  }

  goToBirthDate() {
    this.signupService.setName(this.username);
    this.router.navigateByUrl('/sign-up/birth-date');
  }

}
