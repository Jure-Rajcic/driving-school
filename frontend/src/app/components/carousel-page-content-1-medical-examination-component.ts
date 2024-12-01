import {  Component, inject, ViewChild } from "@angular/core";
import { AppointmentComponent } from "../widgets/appointment-component";
import { MedicalExaminationWidgetType, WidgetService } from "../services/widget-service";
import { Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";
import {  hlmH3, hlmUl } from '../../../libs/ui/ui-typography-helm/src/index';

import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'medical-examination-content',
  standalone: true,
  imports: [AppointmentComponent, AsyncPipe, HlmButtonDirective],
  template: `
      <h3 class="${hlmH3} ">Schedule Your Medical Examination</h3>
      <ul class="${hlmUl}">
        <li>Select at least 3 appointments that you coluld attend.</li>
        <li>Upon selection please click the "Request" button so that our team can confirm the appointment.</li>
      </ul>
      <appointment-component #appointmentComponent [data]="(widgetData$ | async) ?? []"></appointment-component>
      <button class="w-full mt-8" hlmBtn (click)="requestAppointment()">Request</button>
    `,
})
export class MedicalExaminationContentComponent  {
  widgetData$: Observable<MedicalExaminationWidgetType[]> = inject(WidgetService).widgetData$;

  @ViewChild('appointmentComponent')
  appointmentComponent!: AppointmentComponent;

  requestAppointment() {
    if (!this.appointmentComponent) return;
    const selectedAppointments = this.appointmentComponent.getSelectedAppointments();
    console.log('Selected Appointments:', selectedAppointments);
  }

}