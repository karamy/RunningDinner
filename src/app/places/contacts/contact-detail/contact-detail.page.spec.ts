import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactDetailPage } from './contact-detail.page';

describe('ContactDetailPage', () => {
  let component: ContactDetailPage;
  let fixture: ComponentFixture<ContactDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
