import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BirthDatePage } from './birth-date.page';

describe('BirthDatePage', () => {
  let component: BirthDatePage;
  let fixture: ComponentFixture<BirthDatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthDatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BirthDatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
