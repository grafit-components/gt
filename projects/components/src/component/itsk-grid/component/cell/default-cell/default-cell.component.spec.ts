import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DefaultCellComponent } from './default-cell.component';

describe('DefaultCellComponent', () => {
  let component: DefaultCellComponent<any>;
  let fixture: ComponentFixture<DefaultCellComponent<any>>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [DefaultCellComponent],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
