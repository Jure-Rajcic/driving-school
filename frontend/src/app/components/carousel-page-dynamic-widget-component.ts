import { Component, Input, ViewChild, ViewContainerRef, Type, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  standalone: true,
  selector: 'carousel-page-dynamic-widget',
  template: `<ng-container #widgetContainer></ng-container>`,
})
export class DynamicWidgetComponent implements OnChanges {
  @Input() componentType!: Type<any>; // Pass the component type to render dynamically
  @Input() inputs: Record<string, any> = {}; // Inputs for the dynamic component

  @ViewChild('widgetContainer', { read: ViewContainerRef, static: true })
  widgetContainer!: ViewContainerRef;

  ngOnChanges(changes: SimpleChanges): void {
    // Use bracket notation for property access
    if (changes['componentType'] || changes['inputs']) {
      this.loadComponent();
    }
  }

  private loadComponent() {
    if (!this.componentType) return;

    // Clear the container before rendering the new component
    this.widgetContainer.clear();

    // Create the component dynamically
    const componentRef = this.widgetContainer.createComponent(this.componentType);

    // Pass inputs dynamically
    Object.entries(this.inputs).forEach(([key, value]) => {
      (componentRef.instance as any)[key] = value;
    });
  }
}