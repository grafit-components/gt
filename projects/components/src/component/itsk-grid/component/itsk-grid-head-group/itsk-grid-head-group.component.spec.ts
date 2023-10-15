import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskGridHeadGroupComponent } from './itsk-grid-head-group.component';

describe('ItskGridHeadGroupComponent', () => {
  let component: ItskGridHeadGroupComponent;
  let fixture: ComponentFixture<ItskGridHeadGroupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItskGridHeadGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskGridHeadGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
