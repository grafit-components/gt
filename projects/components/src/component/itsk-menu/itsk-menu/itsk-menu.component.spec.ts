import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskMenuComponent } from './itsk-menu.component';

describe('ItskMenuComponent', () => {
  let component: ItskMenuComponent<any>;
  let fixture: ComponentFixture<ItskMenuComponent<any>>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItskMenuComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
