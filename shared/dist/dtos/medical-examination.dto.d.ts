export interface AppointmentDTO {
    id: number;
    date: string;
    time: string;
    location: string;
}
export declare const APPOINTMENT_MANAGEMENT_EVENT = "appointment-management-event";
export interface AppointmentConfirmationReqDto {
    appointments: AppointmentDTO[];
    userId: number;
}
export declare const APPOINTMENT_CONFIRMATION_EVENT_REQ = "appointment-confirmation-event-req";
export interface AppointmentConfirmationResDto {
    appointments: AppointmentDTO;
    userId: number;
}
export declare const APPOINTMENT_CONFIRMATION_EVENT_RES = "appointment-confirmation-event-res";
export declare const NEXT_STEP_UNLOCK_SERVICE = "next-step-unlock-service";
export declare const MEDICAL_EXAMINATIOU_USER_SERVICE = "medical-examination-user-service";
//# sourceMappingURL=medical-examination.dto.d.ts.map