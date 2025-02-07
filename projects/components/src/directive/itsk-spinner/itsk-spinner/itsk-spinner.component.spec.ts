import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskSpinnerComponent } from './itsk-spinner.component';

describe('ItskSpinnerComponent', () => {
  let component: ItskSpinnerComponent;
  let fixture: ComponentFixture<ItskSpinnerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [ItskSpinnerComponent],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
