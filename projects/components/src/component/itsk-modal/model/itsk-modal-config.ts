import {Observable} from 'rxjs';

export class ItskModalConfig {
  backdrop = true;
  resizable: boolean;
  draggable: boolean;
  class: string[] = [];
  esc = true;
  beforeClose: Observable<any>;
  beforeOpen: Observable<any>;

  constructor(options?: {
    backdrop?: boolean;
    resizable?: boolean;
    draggable?: boolean;
    class?: string[];
    esc?: boolean;
    beforeClose?: Observable<any>;
    beforeOpen?: Observable<any>;
  }) {
    if (options) {
      this.backdrop = options.backdrop !== null && options.backdrop !== undefined ? options.backdrop : true;
      this.esc = options.esc !== null && options.esc !== undefined ? options.esc : true;
      this.resizable = options.resizable || false;
      this.draggable = options.draggable || false;
      this.class = options.class || [];

      if (options.beforeClose) {
        this.beforeClose = options.beforeClose;
      }
      if (options.beforeOpen) {
        this.beforeOpen = options.beforeOpen;
      }
    }
  }
}
