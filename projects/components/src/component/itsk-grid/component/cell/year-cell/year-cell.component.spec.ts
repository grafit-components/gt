import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { YearCellComponent } from './year-cell.component';

describe('YearCellComponent', () => {
  let component: YearCellComponent;
  let fixture: ComponentFixture<YearCellComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ YearCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
