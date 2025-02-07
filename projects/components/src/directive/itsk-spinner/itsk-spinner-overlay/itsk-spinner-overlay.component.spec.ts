import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskSpinnerOverlayComponent } from './itsk-spinner-overlay.component';

describe('ItskSpinnerOverlayComponent', () => {
  let component: ItskSpinnerOverlayComponent;
  let fixture: ComponentFixture<ItskSpinnerOverlayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [ItskSpinnerOverlayComponent],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskSpinnerOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
