import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormComponent} from './form/form.component';
import {FormRoutingModule} from "./form-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ItskDatePickerModule} from "@grafit/angular";

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    FormRoutingModule,
    ReactiveFormsModule,
    ItskDatePickerModule
  ]
})
export class FormModule {
}
