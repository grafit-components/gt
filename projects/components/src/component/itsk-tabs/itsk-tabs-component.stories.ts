import {ItskTabsModule} from './itsk-tabs.module';
import {ItskTabsComponent} from './itsk-tabs/itsk-tabs.component';

export default {
    component: ItskTabsComponent,
    title: 'ItskTabsComponent',
    args: {
        activeId: 'second'
    }
}

export const Default = (args: ItskTabsComponent) => ({
    moduleMetadata: {
        imports: [ItskTabsModule]
    },
    props: args,
    template: `<itsk-tabs [activeId]="activeId">
        <itsk-tab [id]="'first'">
          <ng-template itskTabTitle>
            First tab
          </ng-template>
          <ng-template itskTabContent>
            First tab content
          </ng-template>
        </itsk-tab>
        <itsk-tab [title]="'Second tab'" [id]="'second'">
          <ng-template itskTabContent>
            Second tab content
          </ng-template>
        </itsk-tab>
        <itsk-tab [title]="'Disabled tab'" [id]="'third'" [disabled]="true">
          <ng-template itskTabContent>
            Disabled tab content
          </ng-template>
        </itsk-tab>
      </itsk-tabs>`,
});
