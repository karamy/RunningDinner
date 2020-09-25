import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DinnerVotesPage } from './dinner-votes.page';

describe('DinnerVotesPage', () => {
  let component: DinnerVotesPage;
  let fixture: ComponentFixture<DinnerVotesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinnerVotesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DinnerVotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
