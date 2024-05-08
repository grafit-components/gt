import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataLayoutComponent } from './data-layout.component';

describe('DataLayoutComponent', () => {
  let component: DataLayoutComponent;
  let fixture: ComponentFixture<DataLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataLayoutComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
