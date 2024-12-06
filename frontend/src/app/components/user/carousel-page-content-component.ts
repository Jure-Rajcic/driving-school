import { Component, Input, ViewChild, ViewContainerRef, Type, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  standalone: true,
  selector: 'carousel-page-content',
  template: `<ng-container #contentContainer></ng-container>`,
})
export class CarouselPageContentComponent implements OnChanges {
  @Input() componentType!: Type<any>; // Pass the component type to render dynamically
  @Input() inputs: Record<string, any> = {}; // Inputs for the dynamic component

  @ViewChild('contentContainer', { read: ViewContainerRef, static: true })
  contentContainer!: ViewContainerRef;

  ngOnChanges(changes: SimpleChanges): void {
    // Use bracket notation for property access
    if (changes['componentType'] || changes['inputs']) {
      this.loadComponent();
    }
  }

  private loadComponent() {
    if (!this.componentType) return;

    // Clear the container before rendering the new component
    this.contentContainer.clear();

    // Create the component dynamically
    const componentRef = this.contentContainer.createComponent(this.componentType);

    // Pass inputs dynamically
    Object.entries(this.inputs).forEach(([key, value]) => {
      (componentRef.instance as any)[key] = value;
    });
  }
}