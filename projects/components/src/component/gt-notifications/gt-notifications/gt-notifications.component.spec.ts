import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtNotificationsComponent } from './gt-notifications.component';

describe('GtNotificationsComponent', () => {
  let component: GtNotificationsComponent;
  let fixture: ComponentFixture<GtNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GtNotificationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GtNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
