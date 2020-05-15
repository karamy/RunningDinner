import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FoodAllergiesPage } from './food-allergies.page';

describe('FoodAllergiesPage', () => {
  let component: FoodAllergiesPage;
  let fixture: ComponentFixture<FoodAllergiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodAllergiesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FoodAllergiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
