import { inject, Injectable, signal } from '@angular/core';
import { AppointmentConfirmationDTO, ADMIN_RECIVED_USER_REQUESTED_APPOINTMENTS, ADMIN_CONFIRMED_ONE_OF_USER_REQUESTED_APPOINTMENTS, ADMIN_REJECTED_ALL_OF_USER_REQUESTED_APPOINTMENTS, ADMIN_GRANTED_ACCESS_TO_PSYCHOLOGICAL_EXAMINATION, ADMIN_DENIED_ACCESS_TO_PSYCHOLOGICAL_EXAMINATION, ADMIN_ADDED_APPOINTMENT, ADMIN_REMOVED_APPOINTMENT, AppointmentDTO } from '@shared/dtos';
import { SocketClientService } from '../socket-client-service';


interface AccordionItem {
    data: Map<boolean, { title: string; content: string }>;
    state: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class UserMedicalExaminationService {

    private readonly socketService = inject(SocketClientService);
    //TODO better sentences
    private readonly _accordionStates: AccordionItem[] = [
        {
            data: new Map([
                [false, { title: 'Appointment Not Requested', content: 'Please select one of the appointments below.' }],
                [true, { title: 'Appointment Request Sent', content: 'The admin has received your request and will start processing it shortly.' }],
            ]),
            state: false,
        },
        {
            data: new Map([
                [false, { title: 'Awaiting Admin Confirmation', content: 'Our team will notify you as soon as your appointment is confirmed.' }],
                [true, { title: 'Appointment Created', content: 'Your appointment has been successfully scheduled and added to your calendar.' }],
            ]),
            state: false,
        },
        {
            data: new Map([
                [false, { title: 'Waiting for Clinic Email', content: 'We are waiting for the clinic to notify us once they have your results.' }],
                [true, { title: 'Medical Examination Completed', content: 'The clinic has confirmed that you are fit to begin driving school.' }],
            ]),
            state: false,
        }
    ];

    constructor() {
        this.socketService.bindEventCallback(ADMIN_ADDED_APPOINTMENT, this.handleAdminAddedAppointment.bind(this));
        this.socketService.bindEventCallback(ADMIN_REMOVED_APPOINTMENT, this.handleAdminRemovedAppointment.bind(this));
        this.socketService.bindEventCallback(ADMIN_RECIVED_USER_REQUESTED_APPOINTMENTS, this.handleAdminReceivedUserRequestedAppointments.bind(this));
        this.socketService.bindEventCallback(ADMIN_CONFIRMED_ONE_OF_USER_REQUESTED_APPOINTMENTS, this.handleAdminConfirmedOneOfUserRequestedAppointments.bind(this));
        this.socketService.bindEventCallback(ADMIN_REJECTED_ALL_OF_USER_REQUESTED_APPOINTMENTS, this.handleAdminRejectedAllOfUserRequestedAppointments.bind(this));
        this.socketService.bindEventCallback(ADMIN_GRANTED_ACCESS_TO_PSYCHOLOGICAL_EXAMINATION, this.handleAdminGrantedAccessToPsychologicalExamination.bind(this));
        this.socketService.bindEventCallback(ADMIN_DENIED_ACCESS_TO_PSYCHOLOGICAL_EXAMINATION, this.handleAdminDeniedAccessToPsychologicalExamination.bind(this));
    }


    // **** FEATURE 1 ****
    readonly appointments = signal<AppointmentDTO[]>([]);

    public addAppointment(appointment: AppointmentDTO) {
        console.log('Adding appointment:', appointment);
        this.appointments.set([...this.appointments(), appointment]);
    }

    public deleteAppointment(appointment: AppointmentDTO) {
        console.log('Deleting appointment:', appointment);
        console.log('Appointments:', this.appointments());  
        this.appointments.set(this.appointments().filter(a => JSON.stringify(a) !== JSON.stringify(appointment)));
    }

    private handleAdminAddedAppointment(data: AppointmentDTO): void {
        this.addAppointment(data);
    }

    private handleAdminRemovedAppointment(data: AppointmentDTO): void {
        this.deleteAppointment(data);
    }


    // **** FEATURE 2 ****

    readonly accordionItems = signal(this._accordionStates);

    private setAccordionState(index: number, state: boolean): void {
        const updatedAccordionItems = [...this.accordionItems()];
        updatedAccordionItems[index].state = state;
        this.accordionItems.set(updatedAccordionItems);
    }

    private handleAdminReceivedUserRequestedAppointments(data: AppointmentConfirmationDTO): void {
        console.log('Appointment request received:', data);
        this.setAccordionState(0, true);
    }

    private handleAdminConfirmedOneOfUserRequestedAppointments(data: AppointmentConfirmationDTO): void {
        console.log('Appointment request received:', data);
        this.setAccordionState(1, true);
    }

    private handleAdminRejectedAllOfUserRequestedAppointments(data: AppointmentConfirmationDTO): void {
        console.log('Appointment request received:', data);
        this.setAccordionState(0, false);
        this.setAccordionState(1, false);
    }

    private handleAdminGrantedAccessToPsychologicalExamination(data: AppointmentConfirmationDTO): void {
        console.log('Appointment request received:', data);
        this.setAccordionState(2, true);
    }

    private handleAdminDeniedAccessToPsychologicalExamination(data: AppointmentConfirmationDTO): void {
        console.log('Appointment request received:', data);
        this.setAccordionState(0, false);
        this.setAccordionState(1, false);
        this.setAccordionState(2, false);
    }
}