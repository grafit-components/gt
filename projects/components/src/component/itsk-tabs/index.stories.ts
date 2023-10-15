import {ItskTabsModule} from './itsk-tabs.module';

export default { title: 'Tabs (old)' }

export const itskTabs = () => ({
    template: `<itsk-tabs>
        <itsk-tab>
          <ng-template itskTabTitle>
            First tab
          </ng-template>
          <ng-template itskTabContent>
            First tab content
          </ng-template>
        </itsk-tab>
        <itsk-tab [title]="'Second tab'">
          <ng-template itskTabContent>
            Second tab content
          </ng-template>
        </itsk-tab>
        <itsk-tab [title]="'Disabled tab'" [disabled]="true">
          <ng-template itskTabContent>
            Disabled tab content
          </ng-template>
        </itsk-tab>
      </itsk-tabs>`,
    moduleMetadata: {
      imports: [ItskTabsModule]
    }
});
