import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ItskDatePickerModule } from '@grafit/angular';
import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [FormComponent],
  imports: [CommonModule, FormRoutingModule, ReactiveFormsModule, ItskDatePickerModule],
})
export class FormModule {}
