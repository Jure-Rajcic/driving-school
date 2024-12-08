

// **** APPOINTMENT_MANAGMENT_EVENT ****
export interface AppointmentDTO {
    id: number;
    date: string;
    time: string;
    location: string;
}
export const APPOINTMENT_MANAGEMENT_EVENT = 'appointment-management-event';


// **** APPOINTMENT_CONFIRMATION_EVENT_REQ ****
export interface AppointmentConfirmationReqDto {
    appointments: AppointmentDTO[];
    userId: number;
}
export const APPOINTMENT_CONFIRMATION_EVENT_REQ = 'appointment-confirmation-event-req';
// **** APPOINTMENT_CONFIRMATION_EVENT_RES ****
export interface AppointmentConfirmationResDto {
    appointments: AppointmentDTO;
    userId: number;
}
export const APPOINTMENT_CONFIRMATION_EVENT_RES= 'appointment-confirmation-event-res';




// **** NEXT_STEP_UNLOCK_SERVICE ****
export const NEXT_STEP_UNLOCK_SERVICE = 'next-step-unlock-service';
// **** MEDICAL_EXAMINATIOU_USER_SERVICE ****
export const MEDICAL_EXAMINATIOU_USER_SERVICE = 'medical-examination-user-service';


