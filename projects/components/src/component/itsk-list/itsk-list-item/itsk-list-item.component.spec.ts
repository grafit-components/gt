import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskListItemComponent } from './itsk-list-item.component';

describe('ItskListItemComponent', () => {
  let component: ItskListItemComponent;
  let fixture: ComponentFixture<ItskListItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItskListItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
