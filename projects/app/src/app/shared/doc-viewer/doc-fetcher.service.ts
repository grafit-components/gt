import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DocFetcherService {
  private http = inject(HttpClient);
  private _cache: Record<string, Observable<string>> = {};

  fetchDocument(url: string): Observable<string> {
    if (this._cache[url]) {
      return this._cache[url];
    }

    const stream = this.http.get(url, { responseType: 'text' }).pipe(shareReplay(1));
    return stream.pipe(tap(() => (this._cache[url] = stream)));
  }
}
