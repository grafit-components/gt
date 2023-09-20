import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {ItskGridHeadDropdownComponent} from './itsk-grid-head-dropdown.component';

describe('ItskGridHeadDropdownComponent', () => {
  let component: ItskGridHeadDropdownComponent<any>;
  let fixture: ComponentFixture<ItskGridHeadDropdownComponent<any>>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItskGridHeadDropdownComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskGridHeadDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
