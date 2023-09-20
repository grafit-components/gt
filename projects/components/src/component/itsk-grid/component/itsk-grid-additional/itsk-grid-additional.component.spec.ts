import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskGridAdditionalComponent } from './itsk-grid-additional.component';

describe('ItskGridAdditionalComponent', () => {
  let component: ItskGridAdditionalComponent;
  let fixture: ComponentFixture<ItskGridAdditionalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItskGridAdditionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskGridAdditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
