import { Component, inject } from "@angular/core";
import { DataTablePreviewComponent } from "./appointment-component";
import { MedicalExaminationWidgetType, WidgetService } from "../services/widget-service";
import { Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: 'widget-factory',
  standalone: true,
  imports: [DataTablePreviewComponent, AsyncPipe],
  template: `
    <appointment-component [data]="(widgetData$ | async) ?? []"></appointment-component>
    `,
})
export class WidgetFactoryComponent {
  widgetData$: Observable<MedicalExaminationWidgetType[]> = inject(WidgetService).widgetData$;
}