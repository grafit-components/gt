import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItskNotification, ItskNotificationLevel, ItskNotificationService } from '@grafit/angular';
import { DataModel } from '../../model/data-model';
import { Fields } from '../../model/fields';
import { Layers } from '../../model/layers';
import { DataService } from '../../service/data.service';

export class WellDatesValidator {
  static checkRepair(created: Date) {
    return (AC: FormControl) => {
      let repair = AC.value;
      if (repair && created && repair.getTime() < created.getTime()) {
        return { invalidCreatedRepair: true };
      } else {
        return null;
      }
    };
  }
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.styl'],
})
export class FormComponent implements OnInit {
  form: FormGroup;
  fields = Fields;
  layers = Layers;
  new = new DataModel({});

  constructor(
    private notifications: ItskNotificationService,
    private data: DataService,
  ) {
    this.form = new FormGroup({
      well: new FormControl(this.new.well, [Validators.required]),
      field: new FormControl(this.new.field, [Validators.required]),
      layer: new FormControl(this.new.layer, [Validators.required]),
      liq: new FormControl(this.new.liq, [Validators.min(0)]),
      oil: new FormControl(this.new.oil, [Validators.min(0)]),
      pressure: new FormControl(this.new.pressure, [Validators.min(0)]),
      repair: new FormControl(this.new.repair, [WellDatesValidator.checkRepair(this.new.created)]),
      created: new FormControl(this.new.created, [Validators.required]),
    });
  }

  save() {
    this.data.addRow(new DataModel(this.form.value));
    this.form.reset();
    this.notifications.add(
      new ItskNotification({
        level: ItskNotificationLevel.Success,
        text: 'Данные сохранены',
      }),
    );
  }

  trySave() {
    this.validateAllFormFields(this.form);
    if (this.form.valid) {
      this.save();
    } else {
      this.notifications.add(
        new ItskNotification({
          level: ItskNotificationLevel.Error,
          text: 'Форма заполнена некорректно',
        }),
      );
    }
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  ngOnInit(): void {}
}
