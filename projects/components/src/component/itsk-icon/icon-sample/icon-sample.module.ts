import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ItskIconModule } from '../itsk-icon.module';
import { IconSampleComponent } from './icon-sample/icon-sample.component';

@NgModule({
    exports: [IconSampleComponent], imports: [CommonModule, ItskIconModule, IconSampleComponent], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class IconSampleModule {}
