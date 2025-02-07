import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ItskHintContainerComponent } from './itsk-hint-container.component';

describe('ItskHintContainerComponent', () => {
  let component: ItskHintContainerComponent;
  let fixture: ComponentFixture<ItskHintContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [ItskHintContainerComponent],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskHintContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
