import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskCardHeaderComponent } from './itsk-card-header.component';

describe('ItskCardHeaderComponent', () => {
  let component: ItskCardHeaderComponent;
  let fixture: ComponentFixture<ItskCardHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItskCardHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
