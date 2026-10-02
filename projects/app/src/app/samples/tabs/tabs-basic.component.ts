import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItskIconComponent, ItskTabComponent, ItskTabContentDirective, ItskTabsComponent, ItskTabTitleDirective } from '@grafit/components';

@Component({
  selector: 'app-tabs-basic',
  imports: [ItskTabsComponent, ItskTabComponent, ItskTabTitleDirective, ItskTabContentDirective, ItskIconComponent],
  template: `
    <itsk-tabs>
      <itsk-tab title="Описание">
        <ng-template itskTabContent>
          <div class="padding-2">Заголовок вкладки задан строкой через параметр title.</div>
        </ng-template>
      </itsk-tab>
      <itsk-tab>
        <ng-template itskTabTitle><itsk-icon name="icon-settings-star-gear-filled" /> Настройки</ng-template>
        <ng-template itskTabContent>
          <div class="padding-2">Заголовок вкладки задан шаблоном itskTabTitle.</div>
        </ng-template>
      </itsk-tab>
      <itsk-tab title="Недоступная" [disabled]="true">
        <ng-template itskTabContent>
          <div class="padding-2">Эту вкладку нельзя открыть.</div>
        </ng-template>
      </itsk-tab>
    </itsk-tabs>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsBasicComponent {}
