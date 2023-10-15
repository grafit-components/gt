import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskRadioComponent } from './itsk-radio.component';

describe('ItskRadioComponent', () => {
  let component: ItskRadioComponent;
  let fixture: ComponentFixture<ItskRadioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItskRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
