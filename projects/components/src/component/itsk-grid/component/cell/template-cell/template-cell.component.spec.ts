import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TemplateCellComponent } from './template-cell.component';

describe('TemplateCellComponent', () => {
  let component: TemplateCellComponent;
  let fixture: ComponentFixture<TemplateCellComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [TemplateCellComponent],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
