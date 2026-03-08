import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskIconComponent, ItskIconService } from '@grafit/components';

@Component({
  selector: 'app-icons-page',
  imports: [ItskIconComponent, FormsModule],
  templateUrl: './icons-page.component.html',
  styleUrl: './icons-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsPageComponent implements OnInit {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly iconService = inject(ItskIconService);

  protected iconNames: string[] = this.iconService.getAllIconNames();

  ngOnInit(): void {
    if (this.iconNames.length) return;
    setTimeout(() => this.init(), 200);
  }

  private init() {
    this.iconNames = this.iconService.getAllIconNames();
    this.cdr.markForCheck();
  }
}
