import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskSwitchComponent } from './itsk-switch.component';

describe('ItskSwitchComponent', () => {
  let component: ItskSwitchComponent;
  let fixture: ComponentFixture<ItskSwitchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItskSwitchComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
