import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DinnerDetailPage } from './dinner-detail.page';

describe('DinnerDetailPage', () => {
  let component: DinnerDetailPage;
  let fixture: ComponentFixture<DinnerDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinnerDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DinnerDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
