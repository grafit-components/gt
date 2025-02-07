import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskTreeComponent } from './itsk-tree.component';

describe('ItskTreeComponent', () => {
  let component: ItskTreeComponent;
  let fixture: ComponentFixture<ItskTreeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [ItskTreeComponent],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
