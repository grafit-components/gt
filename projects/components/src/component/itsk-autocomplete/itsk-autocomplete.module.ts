import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItskAutocompleteComponent } from './itsk-autocomplete/itsk-autocomplete.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ItskDropdownModule} from '../itsk-dropdown/itsk-dropdown.module';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {ItskSharedModule} from '../itsk-shared/itsk-shared.module';



@NgModule({
  declarations: [
    ItskAutocompleteComponent
  ],
  exports: [
    ItskAutocompleteComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ItskDropdownModule,
        ScrollingModule,
        ItskSharedModule
    ]
})
export class ItskAutocompleteModule { }
