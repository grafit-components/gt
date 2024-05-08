import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskTabsComponent } from './itsk-tabs.component';

describe('ItskTabsComponent', () => {
  let component: ItskTabsComponent;
  let fixture: ComponentFixture<ItskTabsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItskTabsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
