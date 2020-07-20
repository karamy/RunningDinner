import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DinnerMapPage } from './dinner-map.page';

describe('DinnerMapPage', () => {
  let component: DinnerMapPage;
  let fixture: ComponentFixture<DinnerMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinnerMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DinnerMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
