import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectFilterComponent } from './select-filter.component';

describe('SelectFilterComponent', () => {
  let component: SelectFilterComponent;
  let fixture: ComponentFixture<SelectFilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [SelectFilterComponent],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
