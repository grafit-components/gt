import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, TemplateRef } from '@angular/core';
import { IModalResult, ItskModalCloseReason, ItskModalConfig, ItskModalService } from '@grafit/components';

@Component({
  selector: 'app-modal-template',
  template: `
    <button class="button_default" (click)="open(confirm)">Удалить запись</button>
    <br />
    Result: {{ result }}

    <ng-template #confirm let-data let-close="close">
      <div class="padding-5" style="width: 360px">
        <div class="font-title2 margin-b-3">Удалить «{{ data.name }}»?</div>
        <p class="margin-b-4">Окно можно закрыть кнопкой, клавишей Esc или кликом по затемнению.</p>
        <button class="button_primary margin-r-2" (click)="close({ reason: reasons.Resolve })">Удалить</button>
        <button class="button_default" (click)="close({ reason: reasons.Exit })">Отмена</button>
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
