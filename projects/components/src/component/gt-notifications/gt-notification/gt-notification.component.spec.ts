import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtNotificationComponent } from './gt-notification.component';

describe('GtNotificationComponent', () => {
  let component: GtNotificationComponent;
  let fixture: ComponentFixture<GtNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GtNotificationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GtNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
