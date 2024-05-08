import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskGridExpandComponent } from './itsk-grid-expand.component';

describe('ItskGridExpandComponent', () => {
  let component: ItskGridExpandComponent;
  let fixture: ComponentFixture<ItskGridExpandComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItskGridExpandComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskGridExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
