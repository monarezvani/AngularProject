import { Directive, ViewContainerRef } from '@angular/core';
@Directive({
    selector: '[alertDirective]'
})
export class alertDirective {
    constructor(public viewContainer: ViewContainerRef) { }
}