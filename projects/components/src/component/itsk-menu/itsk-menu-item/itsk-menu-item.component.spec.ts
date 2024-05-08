import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskMenuItemComponent } from './itsk-menu-item.component';

describe('ItskMenuItemComponent', () => {
  let component: ItskMenuItemComponent<any>;
  let fixture: ComponentFixture<ItskMenuItemComponent<any>>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItskMenuItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
