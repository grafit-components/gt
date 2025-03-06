import { Injectable } from '@angular/core';
import { BundledLanguage, BundledTheme, createHighlighter, HighlighterGeneric } from 'shiki';

@Injectable({
  providedIn: 'root',
})
export class CodeToHtmlService {
  private highlighter?: HighlighterGeneric<BundledLanguage, BundledTheme>;

  async get(document: string, land: 'html' | 'ts' | 'scss') {
    if (!this.highlighter) {
      this.highlighter = await createHighlighter({
        themes: ['github-dark', 'github-light'],
        langs: ['angular-html', 'angular-ts', 'scss'],
      });
    }

    return this.highlighter!.codeToHtml(document, {
      lang: this.getLang(land),
      theme: 'github-light',
    });
  }

  private getLang(land: 'html' | 'ts' | 'scss') {
    switch (land) {
      case 'ts':
        return 'angular-ts';
      case 'scss':
        return 'angular-html';
      default:
        return land;
    }
  }
}

export type DocumentLang = 'html' | 'ts' | 'scss';
