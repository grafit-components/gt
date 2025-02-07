import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NumericCellComponent } from './numeric-cell.component';

describe('NumericCellComponent', () => {
  let component: NumericCellComponent;
  let fixture: ComponentFixture<NumericCellComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [NumericCellComponent],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
