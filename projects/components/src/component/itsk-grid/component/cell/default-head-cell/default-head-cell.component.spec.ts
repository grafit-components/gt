import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DefaultHeadCellComponent } from './default-head-cell.component';

describe('DefaultHeadCellComponent', () => {
  let component: DefaultHeadCellComponent;
  let fixture: ComponentFixture<DefaultHeadCellComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultHeadCellComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultHeadCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
