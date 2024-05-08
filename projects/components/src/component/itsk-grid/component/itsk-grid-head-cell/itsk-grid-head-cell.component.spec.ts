import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskGridHeadCellComponent } from './itsk-grid-head-cell.component';

describe('ItskGridHeadCellComponent', () => {
  let component: ItskGridHeadCellComponent;
  let fixture: ComponentFixture<ItskGridHeadCellComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItskGridHeadCellComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskGridHeadCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
