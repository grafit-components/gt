import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItskAutocompleteComponent } from './itsk-autocomplete.component';

describe('ItskAutocompleteComponent', () => {
  let component: ItskAutocompleteComponent;
  let fixture: ComponentFixture<ItskAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ItskAutocompleteComponent],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItskAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
