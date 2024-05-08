import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskDropdownComponent } from './itsk-dropdown.component';

describe('ItskDropdownComponent', () => {
  let component: ItskDropdownComponent;
  let fixture: ComponentFixture<ItskDropdownComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItskDropdownComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
