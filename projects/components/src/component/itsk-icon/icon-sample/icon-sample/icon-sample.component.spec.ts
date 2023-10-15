import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconSampleComponent } from './icon-sample.component';

describe('IconSampleComponent', () => {
  let component: IconSampleComponent;
  let fixture: ComponentFixture<IconSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconSampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
