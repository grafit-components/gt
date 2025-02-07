import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskTabbComponent } from './itsk-tab.component';

describe('ItskTabbComponent', () => {
  let component: ItskTabbComponent;
  let fixture: ComponentFixture<ItskTabbComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [ItskTabbComponent],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskTabbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
