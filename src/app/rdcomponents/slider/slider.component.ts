import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserBadge } from 'src/app/home/profile/badges.service';
import { BadgeInfoComponent } from './badge-info/badge-info.component';

@Component({
  selector: 'rd-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  @Input() route: string; // Indica in quale videata è utilizzato ('profile' o 'dinner-details')
  @Input() objectsArray = [];
  @Input() type: string;
  @Input() descriptionVoid: string;

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

  constructor(private popoverController: PopoverController) { }

  ngOnInit() { }

  // Gestione click sul badge
  async onBadgeClick(ev: any, badge: UserBadge) {
    const popover = await this.popoverController.create({
      component: BadgeInfoComponent,
      componentProps: { badge: badge, route: this.route },
      event: ev,
      translucent: true
    });

    await popover.present();
  }
}
