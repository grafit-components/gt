import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskIconComponent } from './itsk-icon.component';

describe('ItskIconComponent', () => {
  let component: ItskIconComponent;
  let fixture: ComponentFixture<ItskIconComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItskIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
