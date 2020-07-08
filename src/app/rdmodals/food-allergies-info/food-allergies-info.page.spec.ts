import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FoodAllergiesInfoPage } from './food-allergies-info.page';

describe('FoodAllergiesInfoPage', () => {
  let component: FoodAllergiesInfoPage;
  let fixture: ComponentFixture<FoodAllergiesInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodAllergiesInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FoodAllergiesInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
