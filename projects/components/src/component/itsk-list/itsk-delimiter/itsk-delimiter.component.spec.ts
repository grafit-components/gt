import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskDelimiterComponent } from './itsk-delimiter.component';

describe('ItskDelimiterComponent', () => {
  let component: ItskDelimiterComponent;
  let fixture: ComponentFixture<ItskDelimiterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [ItskDelimiterComponent],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskDelimiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
