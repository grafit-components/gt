import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskCurrentModal, ItskDynamicData, ItskModalCloseReason, ItskModalService } from '@grafit/components';

/** Содержимое окна: данные и управление окном приходят через внедрение зависимостей */
@Component({
  selector: 'app-rename-dialog',
  imports: [FormsModule],
  template: `
    <div class="padding-5" style="width: 360px">
      <div class="font-title2 margin-b-3">Переименовать</div>
      <div class="input margin-b-4"><input class="input__field" [(ngModel)]="name" /></div>
      <button class="button_primary margin-r-2" (click)="save()">Сохранить</button>
      <button class="button_default" (click)="modal.close()">Отмена</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RenameDialogComponent {
  protected readonly modal = inject(ItskCurrentModal);

  protected name: string = inject(ItskDynamicData)['currentName'];

  protected save() {
    // кроме обязательного reason в результат можно положить любые свои поля
    this.modal.close({ reason: ItskModalCloseReason.Resolve, name: this.name });
  }
}

@Component({
  selector: 'app-modal-component',
  template: `
    <button class="button_default" (click)="open()">Переименовать</button>
    <br />
    Name: {{ name }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponentComponent {
  private readonly modalService = inject(ItskModalService);
  private readonly cdr = inject(ChangeDetectorRef);

  protected name = 'Документ';

  protected open() {
    this.modalService.create(RenameDialogComponent, { currentName: this.name }).onClose.subscribe((result) => {
      if (result.reason === ItskModalCloseReason.Resolve) {
        this.name = result['name'];
        this.cdr.markForCheck();
      }
    });
  }
}
