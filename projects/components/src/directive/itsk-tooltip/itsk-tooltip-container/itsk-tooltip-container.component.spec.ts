import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskTooltipContainerComponent } from './itsk-tooltip-container.component';

describe('ItskTooltipContainerComponent', () => {
  let component: ItskTooltipContainerComponent;
  let fixture: ComponentFixture<ItskTooltipContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [ItskTooltipContainerComponent],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskTooltipContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
