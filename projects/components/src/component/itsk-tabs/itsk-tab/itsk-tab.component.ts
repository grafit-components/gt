import {AfterContentChecked, ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList} from '@angular/core';
import {ItskTabTitleDirective} from '../itsk-tab-title/itsk-tab-title.directive';
import {ItskTabContentDirective} from '../itsk-tab-content/itsk-tab-content.directive';

let nextId = 0;

@Component({
  selector: 'itsk-tab',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItskTabComponent implements AfterContentChecked {
  /**
   * Unique tab identifier. Must be unique for the entire document for proper accessibility support.
   */
  @Input() id = `itsk-tab-${nextId++}`;
  /**
   * Simple (string only) title. Use the "ItskTabTitleDirective" directive for more complex use-cases.
   */
  @Input() title: string = '';
  /**
   * Allows toggling disabled state of a given state. Disabled tabs can't be selected.
   */
  @Input() disabled = false;

  titleTpl: ItskTabTitleDirective | null = null;
  contentTpl: ItskTabContentDirective | null = null;

  @ContentChildren(ItskTabTitleDirective, {descendants: false}) titleTemplates?: QueryList<ItskTabTitleDirective>;
  @ContentChildren(ItskTabContentDirective, {descendants: false}) contentTemplates?: QueryList<ItskTabContentDirective>;

  ngAfterContentChecked() {
    this.titleTpl = this.titleTemplates?.first ?? null;
    this.contentTpl = this.contentTemplates?.first ?? null;
  }
}
