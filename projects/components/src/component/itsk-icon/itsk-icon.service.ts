import {Inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItskIconService {
  private loadedSprites$: string[] = [];
  private renderer$: Renderer2;

  constructor(@Inject(DOCUMENT) protected document$: any,
              private rendererFactory$: RendererFactory2,
              private http$: HttpClient) {
    this.renderer$ = this.rendererFactory$.createRenderer(null, null);
  }

  addSprite(url: string) {
    if (this.loadedSprites$.indexOf(url) < 0) {
      this.getSVG(url).subscribe(_ => {
        this.loadedSprites$.push(url);
        this.renderer$.insertBefore(this.document$.body, _, this.document$.body.firstChild);
      });
    }
  }

  getAllIconNames() {
    const symbols = this.document$.body.querySelectorAll('svg symbol') as NodeList;
    const ids: string[] = [];
    symbols.forEach((s: any) => ids.push(s.id));
    return ids;
  }

  getSVG(url: string): Observable<SVGElement> {
    return this.http$.get(url, {responseType: 'text'})
      .pipe(
        map((svgText: string) => {
          const svgEl = this._svgElementFromString(svgText);
          return this._cloneSVG(svgEl);
        })
      );
  }

  private _svgElementFromString(str: string): SVGElement | never {
    const div = this.renderer$.createElement('DIV');
    div.innerHTML = str;
    const svg = div.querySelector('svg') as SVGElement;
    if (!svg) {
      throw new Error('No SVG found in loaded contents');
    }
    return svg;
  }

  private _cloneSVG(svg: SVGElement): SVGElement {
    return svg.cloneNode(true) as SVGElement;
  }
}
