import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupingGridComponent } from './grouping-grid.component';

describe('GroupingComponent', () => {
  let component: GroupingGridComponent;
  let fixture: ComponentFixture<GroupingGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [GroupingGridComponent],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupingGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
