import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskMonthSelectorComponent } from './itsk-month-selector.component';

describe('ItskMonthSelectorComponent', () => {
  let component: ItskMonthSelectorComponent;
  let fixture: ComponentFixture<ItskMonthSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [ItskMonthSelectorComponent],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskMonthSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
