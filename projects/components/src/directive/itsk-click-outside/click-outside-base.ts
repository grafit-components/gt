export abstract class ClickOutsideBase {
  abstract set visible(val: boolean);

  abstract get visible(): boolean;

  protected constructor(private element: any) {
  }

  abstract clickedOutside: (click: MouseEvent) => any;

  addListener(handleRightClick: boolean) {
    window.addEventListener('click', this.listener);
    if (handleRightClick) {
      window.addEventListener('contextmenu', this.listener);
    }
  }

  removeListener(handleRightClick: boolean) {
    window.removeEventListener('click', this.listener);
    if (handleRightClick) {
      window.removeEventListener('contextmenu', this.listener);
    }
  }

  listener = (click: MouseEvent) => {
    if (!this.visible) {
      return;
    }
    const clickedInside = this.element.contains(click.target);
    if (!clickedInside) {
      this.clickedOutside(click);
    }
  };
}
