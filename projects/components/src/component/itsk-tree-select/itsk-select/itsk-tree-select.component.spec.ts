import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskTreeSelectComponent } from './itsk-tree-select.component';

describe('ItskSelectComponent', () => {
  let component: ItskTreeSelectComponent;
  let fixture: ComponentFixture<ItskTreeSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [ItskTreeSelectComponent],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskTreeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
