import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PhonePage } from './phone.page';

describe('PhonePage', () => {
  let component: PhonePage;
  let fixture: ComponentFixture<PhonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhonePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PhonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
