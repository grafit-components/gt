import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskGridWrapperComponent } from './itsk-grid-wrapper.component';

describe('ItskGridWrapperComponent', () => {
  let component: ItskGridWrapperComponent<any>;
  let fixture: ComponentFixture<ItskGridWrapperComponent<any>>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItskGridWrapperComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskGridWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
