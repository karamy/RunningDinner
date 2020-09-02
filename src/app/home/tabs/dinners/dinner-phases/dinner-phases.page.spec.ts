import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DinnerPhasesPage } from './dinner-phases.page';

describe('DinnerPhasesPage', () => {
  let component: DinnerPhasesPage;
  let fixture: ComponentFixture<DinnerPhasesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinnerPhasesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DinnerPhasesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
