import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskTreeItemComponent } from './itsk-tree-item.component';

describe('ItskTreeItemComponent', () => {
  let component: ItskTreeItemComponent;
  let fixture: ComponentFixture<ItskTreeItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItskTreeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskTreeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
