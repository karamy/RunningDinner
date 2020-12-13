import { Component, OnInit } from '@angular/core';
import { SignupService } from '../signup-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

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
