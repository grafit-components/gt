import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {ItskGridCellComponent} from './itsk-grid-cell.component';

describe('ItskGridCellComponent', () => {
  let component: ItskGridCellComponent<any>;
  let fixture: ComponentFixture<ItskGridCellComponent<any>>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItskGridCellComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskGridCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
