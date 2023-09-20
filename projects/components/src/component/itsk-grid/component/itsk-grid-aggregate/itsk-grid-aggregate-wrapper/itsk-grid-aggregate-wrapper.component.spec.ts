import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskGridAggregateWrapperComponent } from './itsk-grid-aggregate-wrapper.component';

describe('ItskGridAggregateWrapperComponent', () => {
  let component: ItskGridAggregateWrapperComponent<any>;
  let fixture: ComponentFixture<ItskGridAggregateWrapperComponent<any>>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItskGridAggregateWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskGridAggregateWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
