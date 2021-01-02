import { Component, OnInit, Input } from '@angular/core';
import { Dinner } from 'src/app/home/tabs/dinners/dinners.service';

@Component({
  selector: 'rd-dinner',
  templateUrl: './dinner.component.html',
  styleUrls: ['./dinner.component.scss'],
})
export class DinnerComponent implements OnInit {
  @Input() dinner: Dinner;
  @Input() isSkeleton: boolean;

  constructor() { }

  ngOnInit() { }

}
