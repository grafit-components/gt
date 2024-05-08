import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskToggleComponent } from './itsk-toggle.component';

describe('ItskToggleComponent', () => {
  let component: ItskToggleComponent;
  let fixture: ComponentFixture<ItskToggleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItskToggleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
