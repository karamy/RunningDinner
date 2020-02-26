import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddressMapPage } from './address-map.page';

describe('AddressMapPage', () => {
  let component: AddressMapPage;
  let fixture: ComponentFixture<AddressMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddressMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
