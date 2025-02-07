import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskSelectComponent } from './itsk-select.component';

describe('ItskSelectComponent', () => {
  let component: ItskSelectComponent;
  let fixture: ComponentFixture<ItskSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [ItskSelectComponent],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
