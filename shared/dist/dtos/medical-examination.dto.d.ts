export interface AppointmentDTO {
    date: string;
    time: string;
    location: string;
}
export declare const APPOINTMENT_MANAGEMENT_SERVICE = "appointment-management-service";
export interface AppointmentConfirmationReqDto {
    appointments: AppointmentDTO[];
    userId: number;
}
export interface AppointmentConfirmationResDto {
    appointments: AppointmentDTO;
    userId: number;
}
export declare const APPOINTMENT_CONFIRMATION_SERVICE = "appointment-confirmation-service";
export declare const NEXT_STEP_UNLOCK_SERVICE = "next-step-unlock-service";
export declare const MEDICAL_EXAMINATIOU_USER_SERVICE = "medical-examination-user-service";
//# sourceMappingURL=medical-examination.dto.d.ts.map