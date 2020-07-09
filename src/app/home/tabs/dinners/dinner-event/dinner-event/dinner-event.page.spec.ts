import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { DinnerEventPage } from './dinner-event.page';

describe('DinnerEventPage', () => {
  let component: DinnerEventPage;
  let fixture: ComponentFixture<DinnerEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinnerEventPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DinnerEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
