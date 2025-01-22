import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskTimeInputComponent } from './itsk-time-input.component';

describe('ItskTimeInputComponent', () => {
  let component: ItskTimeInputComponent;
  let fixture: ComponentFixture<ItskTimeInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [ItskTimeInputComponent],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskTimeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
