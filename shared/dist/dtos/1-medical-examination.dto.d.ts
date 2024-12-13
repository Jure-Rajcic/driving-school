export interface AppointmentDTO {
    id: number;
    date: string;
    time: string;
    location: string;
}
export interface AppointmentConfirmationDTO {
    appointments: AppointmentDTO[];
    userId: number;
}
export interface AcessToPsychologicalExaminationDTO {
    userId: number;
    granted: boolean;
}
//# sourceMappingURL=1-medical-examination.dto.d.ts.map