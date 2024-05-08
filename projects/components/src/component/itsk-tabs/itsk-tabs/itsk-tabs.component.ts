import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { ItskTabComponent } from '../itsk-tab/itsk-tab.component';

export interface IItskTabChangeEvent {
  activeId: string | null | undefined;
  nextId: string;
  preventDefault: () => void;
}

@Component({
  selector: 'itsk-tabs',
  templateUrl: './itsk-tabs.component.html',
  styleUrls: ['./itsk-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItskTabsComponent implements AfterContentChecked {
  @HostBinding('class.tabs') classTabs = true;
  /** An identifier of an initially selected (active) tab. Use the "select" method to switch a tab programmatically. */
  @Input() activeId: string | null | undefined;

  /** Whether the closed tabs should be hidden without destroying them */
  @Input() destroyOnHide = true;

  /** A tab change event fired right before the tab selection happens. See NgbTabChangeEvent for payload details */
  @Output() tabChange = new EventEmitter<IItskTabChangeEvent>();

  @ContentChildren(ItskTabComponent) tabs?: QueryList<ItskTabComponent>;

  constructor() {}

  /**
   * Selects the tab with the given id and shows its associated pane. Any other tab that was previously selected becomes unselected and its
   * associated pane is hidden.
   */
  select(tabId: string) {
    const selectedTab = this._getTabById(tabId);
    if (selectedTab && !selectedTab.disabled && this.activeId !== selectedTab.id) {
      let defaultPrevented = false;

      this.tabChange.emit({
        activeId: this.activeId,
        nextId: selectedTab.id,
        preventDefault: () => {
          defaultPrevented = true;
        },
      });

      if (!defaultPrevented) {
        this.activeId = selectedTab.id;
      }
    }
  }

  ngAfterContentChecked() {
    const activeTab = this._getTabById(this.activeId);
    this.activeId = activeTab ? activeTab.id : this.tabs?.length ? this.tabs.first.id : null;
  }

  private _getTabById(id: string | null | undefined): ItskTabComponent | null {
    const tabsWithId: ItskTabComponent[] = this.tabs?.filter((tab) => tab.id === id) ?? [];
    return tabsWithId.length ? tabsWithId[0] : null;
  }
}
