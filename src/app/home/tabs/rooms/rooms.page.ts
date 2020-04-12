import { Component, OnInit } from '@angular/core';
import { RDParamsService } from 'src/app/rdparams.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss']
})
export class RoomsPage implements OnInit {

  constructor(public paramsService: RDParamsService) { }

  ngOnInit() {
  }
}
