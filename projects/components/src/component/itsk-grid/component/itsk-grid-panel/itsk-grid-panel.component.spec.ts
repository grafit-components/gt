import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskGridPanelComponent } from './itsk-grid-panel.component';

describe('ItskGridPanelComponent', () => {
  let component: ItskGridPanelComponent;
  let fixture: ComponentFixture<ItskGridPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItskGridPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskGridPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
