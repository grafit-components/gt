import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskGridComponent } from './itsk-grid.component';

describe('ItskGridComponent', () => {
  let component: ItskGridComponent<any>;
  let fixture: ComponentFixture<ItskGridComponent<any>>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItskGridComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
