import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FilterGroupWrapperComponent } from './filter-group-wrapper.component';

describe('FilterGroupWrapperComponent', () => {
  let component: FilterGroupWrapperComponent;
  let fixture: ComponentFixture<FilterGroupWrapperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FilterGroupWrapperComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterGroupWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
