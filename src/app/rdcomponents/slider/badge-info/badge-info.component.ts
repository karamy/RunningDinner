import { Component, Input, OnInit } from '@angular/core';
import { UserBadge } from 'src/app/home/profile/badges.service';

@Component({
  selector: 'app-badge-info',
  templateUrl: './badge-info.component.html',
  styleUrls: ['./badge-info.component.scss'],
})
export class BadgeInfoComponent implements OnInit {

  @Input() badge: UserBadge;
  @Input() route: string

  constructor() { }

  ngOnInit() { }

}
