
import { Inject, Injectable, OnDestroy, DOCUMENT } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OverlayContainerService implements OnDestroy {
  private containerClass$ = 'overlay-container';
  private container$?: HTMLElement;

  constructor(@Inject(DOCUMENT) private document$: any) {}

  getContainer() {
    if (!this.container$) {
      this.createContainer();
    }
    return this.container$;
  }

  private createContainer() {
    const container = this.document$.createElement('div');
    container.classList.add(this.containerClass$);
    this.document$.body.appendChild(container);
    this.container$ = container;
  }

  ngOnDestroy() {
    if (this.container$ && this.container$.parentNode) {
      this.container$.parentNode.removeChild(this.container$);
    }
  }
}
