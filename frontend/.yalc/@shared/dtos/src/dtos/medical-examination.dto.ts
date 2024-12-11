

// **** APPOINTMENT_MANAGMENT_EVENT ****
export interface AppointmentDTO {
    id: number;
    date: string;
    time: string;
    location: string;
}
export const APPOINTMENT_MANAGEMENT_EVENT = 'appointment-management-event';


// **** APPOINTMENT_CONFIRMATION_EVENT ****
export interface AppointmentConfirmationDTO {
    appointments: AppointmentDTO[];
    userId: number;
}
export const APPOINTMENT_CONFIRMATION_EVENT = 'appointment-confirmation-event';


// **** MEDICAL_EXAMINATION_USER_RESULT_EVENT ****
export const MEDICAL_EXAMINATION_USER_RESULT_EVENT = 'medical-examination-user-result-event';