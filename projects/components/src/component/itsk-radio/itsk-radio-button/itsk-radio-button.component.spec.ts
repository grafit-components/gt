import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskRadioButtonComponent } from './itsk-radio-button.component';

describe('ItskRadioButtonComponent', () => {
  let component: ItskRadioButtonComponent;
  let fixture: ComponentFixture<ItskRadioButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [ItskRadioButtonComponent],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskRadioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
