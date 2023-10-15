import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskPagerComponent } from './itsk-pager.component';

describe('ItskPagerComponent', () => {
  let component: ItskPagerComponent;
  let fixture: ComponentFixture<ItskPagerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItskPagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskPagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
