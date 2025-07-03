import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleSlice'
})
export class TitleSlicePipe implements PipeTransform {

  transform( productTitles:string,numOfWords:number): string {
    return productTitles.split(" ").slice(0,numOfWords).join(" ");
  }

}
