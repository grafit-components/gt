import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, TemplateRef } from '@angular/core';
import { IModalResult, ItskModalCloseReason, ItskModalConfig, ItskModalService } from '@grafit/components';

@Component({
  selector: 'app-modal-template',
  template: `
    <button class="button_default" (click)="open(confirm)">Удалить запись</button>
    <br />
    Result: {{ result }}

    <ng-template #confirm let-data let-close="close">
      <div style="width: 360px">
        <div class="modal__head">
          <div class="font-title2 container_auto">Удалить «{{ data.name }}»?</div>
        </div>
        <div class="modal__content">
          <p>Окно можно закрыть кнопкой, клавишей Esc или кликом по затемнению.</p>
        </div>
        <div class="modal__foot">
          <button class="button_primary margin-r-2" (click)="close({ reason: reasons.Resolve })">Удалить</button>
          <button class="button_default" (click)="close({ reason: reasons.Exit })">Отмена</button>
        </div>
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalTemplateComponent {
  private readonly modalService = inject(ItskModalService);
  private readonly cdr = inject(ChangeDetectorRef);

  protected reasons = ItskModalCloseReason;

  protected result = '—';

  protected open(template: TemplateRef<unknown>) {
    const modal = this.modalService.create(template, { name: 'Отчёт за май' }, new ItskModalConfig({ backdrop: true, esc: true }));

    modal.onClose.subscribe((result: IModalResult) => {
      this.result = ItskModalCloseReason[result.reason];
      this.cdr.markForCheck();
    });
  }
}
