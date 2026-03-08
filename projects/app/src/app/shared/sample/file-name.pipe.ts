import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileName',
})
export class FileNamePipe implements PipeTransform {
  transform(value: string): string | undefined {
    return value.split('/').at(-1);
  }
}
