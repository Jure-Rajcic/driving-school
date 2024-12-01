import { Component, Input, ViewChild, ViewContainerRef, Type, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  standalone: true,
  selector: 'carousel-page-result',
  template: `<ng-container #resultContainer></ng-container>`,
})
export class CarouselPageResultComponent implements OnChanges {
  @Input() componentType!: Type<any>; // Pass the component type to render dynamically
  @Input() inputs: Record<string, any> = {}; // Inputs for the dynamic component

  @ViewChild('resultContainer', { read: ViewContainerRef, static: true })
  resultContainer!: ViewContainerRef;

  ngOnChanges(changes: SimpleChanges): void {
    // Use bracket notation for property access
    if (changes['componentType'] || changes['inputs']) {
      this.loadComponent();
    }
  }

  private loadComponent() {
    if (!this.componentType) return;

    // Clear the container before rendering the new component
    this.resultContainer.clear();

    // Create the component dynamically
    const componentRef = this.resultContainer.createComponent(this.componentType);

    // Pass inputs dynamically
    Object.entries(this.inputs).forEach(([key, value]) => {
      (componentRef.instance as any)[key] = value;
    });
  }
}