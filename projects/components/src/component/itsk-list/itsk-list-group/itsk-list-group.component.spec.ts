import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskListGroupComponent } from './itsk-list-group.component';

describe('ItskListGroupComponent', () => {
  let component: ItskListGroupComponent;
  let fixture: ComponentFixture<ItskListGroupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItskListGroupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskListGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
