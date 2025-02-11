import { PortalModule } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CodeToHtmlService, DocumentLang } from './code-to-html.service';
import { DocFetcherService } from './doc-fetcher.service';

@Component({
  selector: 'app-doc-viewer',
  imports: [PortalModule],
  template: 'Загрузка документа...',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocViewerComponent {
  private readonly codeToHtmlService = inject(CodeToHtmlService);
  private readonly elementRef = inject(ElementRef);
  private readonly domSanitizer = inject(DomSanitizer);
  private readonly docFetcherService = inject(DocFetcherService);

  readonly fileSrc = input<string>();
  readonly code = input<string>();
  readonly lang = input<DocumentLang>('ts');

  constructor() {
    effect(() => {
      const fileSrc = this.fileSrc();
      if (fileSrc) {
        this.docFetcherService.fetchDocument(fileSrc).subscribe(async (document) => {
          const lang = this.getLang(fileSrc);
          const preparedDocument = document.replace(/href="#([^"]*)"/g, (_m: string, fragmentUrl: string) => {
            const absoluteUrl = `${location.pathname}#${fragmentUrl}`;
            return `href="${this.domSanitizer.sanitize(SecurityContext.URL, absoluteUrl)}"`;
          });

          await this.updateDocument(preparedDocument, lang);
        });
      }
    });

    effect(async () => {
      const code = this.code();
      const lang = this.lang();
      if (code && lang) {
        await this.updateDocument(code, lang);
      }
    });
  }

  private async updateDocument(rawDocument: string, lang: DocumentLang) {
    const documentHtml = await this.codeToHtmlService.get(rawDocument, lang);
    this.elementRef.nativeElement.innerHTML = documentHtml;
  }

  private getLang(fileSrc: string): DocumentLang {
    if (fileSrc.endsWith('.ts')) {
      return 'ts';
    }
    if (fileSrc.endsWith('.html')) {
      return 'html';
    }
    if (fileSrc.endsWith('.scss')) {
      return 'scss';
    }

    throw new Error('Unsupported file type');
  }
}
