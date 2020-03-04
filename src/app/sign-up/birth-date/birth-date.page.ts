import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-birth-date',
  templateUrl: './birth-date.page.html',
  styleUrls: ['./birth-date.page.scss'],
})
export class BirthDatePage implements OnInit {

  birthdate: Date;

  constructor() { }

  ngOnInit() {
  }

}
