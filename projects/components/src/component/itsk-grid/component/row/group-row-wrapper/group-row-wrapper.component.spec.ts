import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GroupRowWrapperComponent } from './group-row-wrapper.component';

describe('GroupRowWrapperComponent', () => {
  let component: GroupRowWrapperComponent;
  let fixture: ComponentFixture<GroupRowWrapperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupRowWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupRowWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
