import { ComponentFixture, TestBed } from '@angular/core/testing';
import {TreeSelectComponent} from "./tree-select.component";


describe('TreeSelectComponent', () => {
  let component: TreeSelectComponent;
  let fixture: ComponentFixture<TreeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeSelectComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TreeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
