import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskMenuButtonComponent } from './itsk-menu-button.component';

describe('ItskMenuButtonComponent', () => {
  let component: ItskMenuButtonComponent;
  let fixture: ComponentFixture<ItskMenuButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [ItskMenuButtonComponent],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
