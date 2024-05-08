import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoolCellComponent } from './bool-cell.component';

describe('BoolCellComponent', () => {
  let component: BoolCellComponent;
  let fixture: ComponentFixture<BoolCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoolCellComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoolCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
