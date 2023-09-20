import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskMenuItemsComponent } from './itsk-menu-items.component';

describe('ItskMenuItemsComponent', () => {
  let component: ItskMenuItemsComponent;
  let fixture: ComponentFixture<ItskMenuItemsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItskMenuItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskMenuItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
