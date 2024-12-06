

// **** APPOINTMENT_CONFIRMATION_SERVICE ****
export interface AppointmentDTO {
    date: string;
    time: string;
    location: string;
}
export const APPOINTMENT_MANAGEMENT_SERVICE = 'appointment-management-service';

// **** APPOINTMENT_CONFIRMATION_SERVICE ****
export interface AppointmentConfirmationReqDto {
    appointments: AppointmentDTO[];
    userId: number;
}
export interface AppointmentConfirmationResDto {
    appointments: AppointmentDTO;
    userId: number;
}
export const APPOINTMENT_CONFIRMATION_SERVICE = 'appointment-confirmation-service';


// **** NEXT_STEP_UNLOCK_SERVICE ****
export const NEXT_STEP_UNLOCK_SERVICE = 'next-step-unlock-service';


// **** MEDICAL_EXAMINATIOU_USER_SERVICE ****
export const MEDICAL_EXAMINATIOU_USER_SERVICE = 'medical-examination-user-service';

