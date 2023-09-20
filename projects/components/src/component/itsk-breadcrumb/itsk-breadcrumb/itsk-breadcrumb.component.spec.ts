import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskBreadcrumbComponent } from './itsk-breadcrumb.component';

describe('ItskBreadcrumbComponent', () => {
  let component: ItskBreadcrumbComponent;
  let fixture: ComponentFixture<ItskBreadcrumbComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItskBreadcrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
