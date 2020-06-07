import { Component, OnInit, Input } from '@angular/core';
import { Dinner } from 'src/app/home/tabs/dinners/dinners.service';

@Component({
  selector: 'rd-my-dinner',
  templateUrl: './my-dinner.component.html',
  styleUrls: ['./my-dinner.component.scss'],
})
export class MyDinnerComponent implements OnInit {
  @Input() dinner: Dinner;

  constructor() { }

  ngOnInit() { }
}
