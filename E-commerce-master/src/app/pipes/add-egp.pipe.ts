import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addEGP'
})
export class AddEGPPipe implements PipeTransform {

  transform(prise:any):string   {
    return `${prise} EGP`;
  }

}
