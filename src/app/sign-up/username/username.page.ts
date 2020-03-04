import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-username',
  templateUrl: './username.page.html',
  styleUrls: ['./username.page.scss'],
})
export class UsernamePage implements OnInit {

  username: string;

  constructor() { }

  ngOnInit() {
    this.username = null;
  }

}
