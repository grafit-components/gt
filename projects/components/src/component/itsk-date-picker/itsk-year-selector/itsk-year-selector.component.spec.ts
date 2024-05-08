import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskYearSelectorComponent } from './itsk-year-selector.component';

describe('ItskYearSelectorComponent', () => {
  let component: ItskYearSelectorComponent;
  let fixture: ComponentFixture<ItskYearSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItskYearSelectorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskYearSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
