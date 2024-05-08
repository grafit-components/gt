import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskGridAggregateComponent } from './itsk-grid-aggregate.component';

describe('ItskGridAggregateComponent', () => {
  let component: ItskGridAggregateComponent;
  let fixture: ComponentFixture<ItskGridAggregateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItskGridAggregateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskGridAggregateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
