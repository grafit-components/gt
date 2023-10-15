import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VirtualSelectFilterComponent } from './virtual-select-filter.component';

describe('VirtualSelectFilterComponent', () => {
  let component: VirtualSelectFilterComponent;
  let fixture: ComponentFixture<VirtualSelectFilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualSelectFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualSelectFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
