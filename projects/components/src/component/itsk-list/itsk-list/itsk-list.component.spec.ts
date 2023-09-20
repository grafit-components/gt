import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskListComponent } from './itsk-list.component';

describe('ItskListComponent', () => {
  let component: ItskListComponent;
  let fixture: ComponentFixture<ItskListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItskListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
