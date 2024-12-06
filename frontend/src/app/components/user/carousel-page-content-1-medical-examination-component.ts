import {  Component, inject, ViewChild } from "@angular/core";
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { AppointmentManagementService } from "../../services/1-medical-examination-admin-appointment-managment-service";
import {  hlmH3, hlmUl } from '../../../../libs/ui/ui-typography-helm/src/index';
import { AppointmentComponent } from "./appointment-component";

@Component({
  selector: 'medical-examination-content',
  standalone: true,
  imports: [AppointmentComponent, HlmButtonDirective],
  templateUrl: './carousel-page-content-1-medical-examination-component.html',
})
export class MedicalExaminationContentComponent  {
  
  adminService = inject(AppointmentManagementService);
  appointments = this.adminService.appointments;

  hlmH3 = hlmH3;
  hlmUl = hlmUl;

  @ViewChild('appointmentComponent')
  appointmentComponent!: AppointmentComponent;

  requestAppointment() {
    // TODO open dialog and edit upper text
    if (!this.appointmentComponent) return;
    const selectedAppointments = this.appointmentComponent.getSelectedAppointments();
    console.log('Selected Appointments:', selectedAppointments);
  }

}