import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskCardComponent } from './itsk-card.component';

describe('ItskCardComponent', () => {
  let component: ItskCardComponent;
  let fixture: ComponentFixture<ItskCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [ItskCardComponent],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
