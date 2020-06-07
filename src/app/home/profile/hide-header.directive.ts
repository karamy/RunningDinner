import { Directive, Input, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[appHideHeader]',
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})

export class HideHeaderDirective {
  @Input("header") header: any;

  constructor(public element: ElementRef, public renderer: Renderer) {
  }
  
  ngOnInit() {
    this.renderer.setElementStyle(this.header.el, 'webkitTransition', 'top 700ms');
  }

  onContentScroll(event) {
    if (event.detail.deltaY > 10 || event.detail.currentY > 50) {
      this.renderer.setElementStyle(this.header.el, 'top', '-56px');
    }
    else if (event.detail.currentY < 50) {
      this.renderer.setElementStyle(this.header.el, 'top', '0px');
    }
  }
}
