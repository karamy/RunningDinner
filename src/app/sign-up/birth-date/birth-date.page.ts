import { Component, OnInit } from '@angular/core';
import { SignupService } from '../signup-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-birth-date',
  templateUrl: './birth-date.page.html',
  styleUrls: ['./birth-date.page.scss'],
})
export class BirthDatePage implements OnInit {

  birthdate: Date;

  constructor(private signupService: SignupService, private router: Router) { }

  ngOnInit() {
  }

  goToProfilePhoto() {
    this.signupService.setBirthDate(this.birthdate);
    this.router.navigateByUrl('/sign-up/profile-photo');
  }

}
