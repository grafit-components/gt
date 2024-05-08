import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskTreeHostComponent } from './itsk-tree-host.component';

describe('ItskTreeHostComponent', () => {
  let component: ItskTreeHostComponent;
  let fixture: ComponentFixture<ItskTreeHostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItskTreeHostComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskTreeHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
