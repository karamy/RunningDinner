import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dinner-info',
  templateUrl: './dinner-info.page.html',
  styleUrls: ['./dinner-info.page.scss'],
})
export class DinnerInfoPage implements OnInit {

  @Input() dinnerTime: Date;

  constructor() { }

  ngOnInit() {
  }

}
