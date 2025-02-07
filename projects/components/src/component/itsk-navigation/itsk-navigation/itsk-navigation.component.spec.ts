import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItskNavigationComponent } from './itsk-navigation.component';

describe('ItskNavigationComponent', () => {
  let component: ItskNavigationComponent;
  let fixture: ComponentFixture<ItskNavigationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [ItskNavigationComponent],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
