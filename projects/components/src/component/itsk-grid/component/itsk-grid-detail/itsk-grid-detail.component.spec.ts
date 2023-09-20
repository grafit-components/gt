import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {ItskGridDetailComponent} from './itsk-grid-detail.component';

describe('ItskGridDetailComponent', () => {
  let component: ItskGridDetailComponent<any>;
  let fixture: ComponentFixture<ItskGridDetailComponent<any>>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItskGridDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskGridDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
