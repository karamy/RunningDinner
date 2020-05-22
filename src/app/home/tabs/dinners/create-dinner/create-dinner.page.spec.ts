import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateDinnerPage } from './create-dinner.page';

describe('CreateDinnerPage', () => {
  let component: CreateDinnerPage;
  let fixture: ComponentFixture<CreateDinnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDinnerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDinnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
