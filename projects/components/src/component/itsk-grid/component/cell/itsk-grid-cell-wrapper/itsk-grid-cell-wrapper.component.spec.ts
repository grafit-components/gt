import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskGridCellWrapperComponent } from './itsk-grid-cell-wrapper.component';

describe('ItskGridCellWrapperComponent', () => {
  let component: ItskGridCellWrapperComponent<any>;
  let fixture: ComponentFixture<ItskGridCellWrapperComponent<any>>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [ItskGridCellWrapperComponent],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskGridCellWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
