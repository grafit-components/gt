import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskDaySelectorComponent } from './itsk-day-selector.component';

describe('ItskDaySelectorComponent', () => {
  let component: ItskDaySelectorComponent;
  let fixture: ComponentFixture<ItskDaySelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [ItskDaySelectorComponent],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskDaySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
