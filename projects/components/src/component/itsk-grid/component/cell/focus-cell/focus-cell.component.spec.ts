import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FocusCellComponent } from './focus-cell.component';

describe('FocusCellComponent', () => {
  let component: FocusCellComponent<any>;
  let fixture: ComponentFixture<FocusCellComponent<any>>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [FocusCellComponent],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FocusCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
