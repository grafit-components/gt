import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IItskTabChangeEvent, ItskTabComponent, ItskTabContentDirective, ItskTabsComponent, ItskToggleComponent } from '@grafit/components';

@Component({
  selector: 'app-tabs-control',
  imports: [ItskTabsComponent, ItskTabComponent, ItskTabContentDirective, ItskToggleComponent, FormsModule],
  template: `
    <itsk-toggle [(ngModel)]="locked">Запретить переключение</itsk-toggle>
    <br />
    <itsk-tabs #tabs activeId="second" (tabChange)="onTabChange($event)">
      <itsk-tab id="first" title="Первая">
        <ng-template itskTabContent><div class="padding-2">Содержимое первой вкладки</div></ng-template>
      </itsk-tab>
      <itsk-tab id="second" title="Вторая">
        <ng-template itskTabContent><div class="padding-2">Содержимое второй вкладки</div></ng-template>
      </itsk-tab>
    </itsk-tabs>
    <button class="button_default" (click)="tabs.select('first')">Открыть первую</button>
    <br />
    Last event: {{ lastEvent }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsControlComponent {
  protected locked = false;

  protected lastEvent = '—';

  protected onTabChange(event: IItskTabChangeEvent) {
    if (this.locked) {
      event.preventDefault();
      this.lastEvent = `переход на «${event.nextId}» отменён`;
    } else {
      this.lastEvent = `${event.activeId} → ${event.nextId}`;
    }
  }
}
