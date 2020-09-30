import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DinnerWinnersPage } from './dinner-winners.page';

describe('DinnerWinnersPage', () => {
  let component: DinnerWinnersPage;
  let fixture: ComponentFixture<DinnerWinnersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinnerWinnersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DinnerWinnersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
