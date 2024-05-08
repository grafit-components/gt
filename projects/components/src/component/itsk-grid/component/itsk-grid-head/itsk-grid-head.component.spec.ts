import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskGridHeadComponent } from './itsk-grid-head.component';

describe('ItskGridHeadComponent', () => {
  let component: ItskGridHeadComponent;
  let fixture: ComponentFixture<ItskGridHeadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItskGridHeadComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskGridHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
