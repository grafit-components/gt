import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ItskIconModule } from '../itsk-icon.module';
import { IconSampleComponent } from './icon-sample/icon-sample.component';

@NgModule({ declarations: [IconSampleComponent],
    exports: [IconSampleComponent], imports: [CommonModule, ItskIconModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class IconSampleModule {}
