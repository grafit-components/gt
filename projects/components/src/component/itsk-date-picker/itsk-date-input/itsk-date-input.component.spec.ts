import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskDateInputComponent } from './itsk-date-input.component';

describe('ItskDateInputComponent', () => {
  let component: ItskDateInputComponent;
  let fixture: ComponentFixture<ItskDateInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [ItskDateInputComponent],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskDateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
