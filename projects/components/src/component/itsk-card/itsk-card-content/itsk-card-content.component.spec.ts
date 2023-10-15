import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskCardContentComponent } from './itsk-card-content.component';

describe('ItskCardContentComponent', () => {
  let component: ItskCardContentComponent;
  let fixture: ComponentFixture<ItskCardContentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItskCardContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskCardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
