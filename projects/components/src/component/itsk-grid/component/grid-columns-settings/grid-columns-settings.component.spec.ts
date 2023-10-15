import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GridColumnsSettingsComponent } from './grid-columns-settings.component';

describe('GridColumnsSettingsComponent', () => {
  let component: GridColumnsSettingsComponent;
  let fixture: ComponentFixture<GridColumnsSettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GridColumnsSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridColumnsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
