import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DinnerInfoPage } from './dinner-info.page';

describe('DinnerInfoPage', () => {
  let component: DinnerInfoPage;
  let fixture: ComponentFixture<DinnerInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinnerInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DinnerInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
