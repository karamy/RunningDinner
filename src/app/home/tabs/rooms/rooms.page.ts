import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss']
})
export class RoomsPage implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
}
