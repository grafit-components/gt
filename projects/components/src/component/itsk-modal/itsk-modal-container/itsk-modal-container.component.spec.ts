import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskModalContainerComponent } from './itsk-modal-container.component';

describe('ItskModalContainerComponent', () => {
  let component: ItskModalContainerComponent;
  let fixture: ComponentFixture<ItskModalContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [ItskModalContainerComponent],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskModalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
