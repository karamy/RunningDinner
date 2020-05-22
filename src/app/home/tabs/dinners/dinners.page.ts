import { Component, OnInit } from '@angular/core';
import { RDParamsService } from 'src/app/rdparams.service';

@Component({
  selector: 'app-dinners',
  templateUrl: './dinners.page.html',
  styleUrls: ['./dinners.page.scss']
})
export class DinnersPage implements OnInit {

  constructor(public paramsService: RDParamsService) { }

  ngOnInit() {
  }
}
