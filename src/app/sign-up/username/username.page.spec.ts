import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsernamePage } from './username.page';

describe('UsernamePage', () => {
  let component: UsernamePage;
  let fixture: ComponentFixture<UsernamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsernamePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsernamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
