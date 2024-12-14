import { inject, Injectable, signal } from '@angular/core';
import { SocketClientService } from '../socket-client-service';
import { AppointmentDTO, AppointmentConfirmationDTO, ADMIN_CONFIRMED_ONE_OF_USER_REQUESTED_APPOINTMENTS, ADMIN_REJECTED_ALL_OF_USER_REQUESTED_APPOINTMENTS, USER_REQUESTED_APPOINTMENTS, MEDICAL_EXAMINATION_ADMIN_CONFIRMED_ONE_OF_USER_REQUESTED_APPOINTMENTS } from '@shared/dtos';
import { filter } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AppointmentConfirmationService {

    private readonly socketService = inject(SocketClientService);

    constructor() {
        this.socketService.bindEventCallback(USER_REQUESTED_APPOINTMENTS, this.handleUserRequestedAppointments.bind(this));
        this.socketService.bindEventCallback(ADMIN_CONFIRMED_ONE_OF_USER_REQUESTED_APPOINTMENTS, this.handleAdminConfirmedOneOfUserRequestedAppointments.bind(this));
        this.socketService.bindEventCallback(ADMIN_REJECTED_ALL_OF_USER_REQUESTED_APPOINTMENTS, this.handelAdminRejectedAllOfUserRequestedAppointments.bind(this));
    }

    readonly appointmentConfirmationRequests = signal<AppointmentConfirmationDTO[]>([]);

    addAppointmentConfirmationReq(appointmentConfirmation: AppointmentConfirmationDTO): void {
        this.appointmentConfirmationRequests.set([...this.appointmentConfirmationRequests(), appointmentConfirmation]);
    }

    private handleUserRequestedAppointments(data: AppointmentConfirmationDTO): void {
        console.log('User requested appointments');
        this.addAppointmentConfirmationReq(data);
    }

    private handleAdminConfirmedOneOfUserRequestedAppointments(data: AppointmentConfirmationDTO): void {
        console.log('Admin confirmed one of user requested appointments', data);
        this.appointmentConfirmationRequests.set(this.appointmentConfirmationRequests().filter(a => a.userId !== data.userId));
    }

    private handelAdminRejectedAllOfUserRequestedAppointments(data: AppointmentConfirmationDTO): void {
        console.log('Admin rejected all of user requested appointments', data);
        this.appointmentConfirmationRequests.set(this.appointmentConfirmationRequests().filter(a => a.userId !== data.userId));
    }

}