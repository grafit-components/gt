import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskCheckboxComponent } from './itsk-checkbox.component';

describe('ItskCheckboxComponent', () => {
  let component: ItskCheckboxComponent;
  let fixture: ComponentFixture<ItskCheckboxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [ItskCheckboxComponent],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
