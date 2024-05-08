import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskGridBodyComponent } from './itsk-grid-body.component';

describe('ItskGridBodyComponent', () => {
  let component: ItskGridBodyComponent<any>;
  let fixture: ComponentFixture<ItskGridBodyComponent<any>>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItskGridBodyComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskGridBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
