import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskFilterPanelComponent } from './itsk-filter-panel.component';

describe('ItskFilterPanelComponent', () => {
  let component: ItskFilterPanelComponent;
  let fixture: ComponentFixture<ItskFilterPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItskFilterPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskFilterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
