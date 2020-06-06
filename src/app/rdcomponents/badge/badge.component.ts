import { Component, OnInit, Input } from '@angular/core';
import { UserBadge } from 'src/app/home/profile/badges.service';

@Component({
  selector: 'rd-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent implements OnInit {

  @Input() contactBadges: UserBadge[];

  // Impostazioni ion-slides
  slideOpts = {
    slidesPerView: 5,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  };

  constructor() { }

  ngOnInit() { }

}
