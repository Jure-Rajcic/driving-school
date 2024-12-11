export interface AppointmentDTO {
    id: number;
    date: string;
    time: string;
    location: string;
}
export declare const APPOINTMENT_MANAGEMENT_EVENT = "appointment-management-event";
export interface AppointmentConfirmationDTO {
    appointments: AppointmentDTO[];
    userId: number;
}
export declare const APPOINTMENT_CONFIRMATION_EVENT = "appointment-confirmation-event";
export declare const MEDICAL_EXAMINATION_USER_RESULT_EVENT = "medical-examination-user-result-event";
//# sourceMappingURL=medical-examination.dto.d.ts.map