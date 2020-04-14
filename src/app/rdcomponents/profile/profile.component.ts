import { Component, OnInit } from '@angular/core';
import { RDParamsService } from 'src/app/rdparams.service';

@Component({
  selector: 'rd-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  iconName: string;

  constructor(private paramsService: RDParamsService) { }

  ngOnInit() {}

  // Ottengo l'icona corretta se appartengo a un gruppo o no
  getIconName() {
    if (this.paramsService.getParams().groupId) {
      return "people-outline" // Gruppo
    } else {
      return "person-circle-outline" // Singolo
    }
  }

}
