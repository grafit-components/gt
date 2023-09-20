import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GroupRowDefaultComponent } from './group-row-default.component';

describe('GroupRowDefaultComponent', () => {
  let component: GroupRowDefaultComponent;
  let fixture: ComponentFixture<GroupRowDefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupRowDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupRowDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
