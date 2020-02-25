import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DinnerPage } from './dinner.page';

describe('DinnerPage', () => {
  let component: DinnerPage;
  let fixture: ComponentFixture<DinnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinnerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DinnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
