import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appInputFormat]'
  // this selecto has sqaure barckets which basically means any element that has this attribute 
  // appInputFormat
  //  if angular finds an element with this attribute its going to apply this directive on that element
  
  //  here we want to add 2 dom events focus and blur
})
export class InputFormatDirective {
  // @Input('format') format;
  @Input('appInputFormat') format;

  constructor(private el:ElementRef) { }
// eventName when to call
  @HostListener('focus') onFocus() {
    console.log("on Focus");
    
  }

  @HostListener('blur') onBlur() {
    console.log("on Blur");
    let value:string=this.el.nativeElement.value;
    if (this.format=='lowercase')
      this.el.nativeElement.value=value.toLowerCase();
    else
    this.el.nativeElement.value=value.toUpperCase();

  }
  

}
