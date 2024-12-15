import { ClientDTO } from "./client.dto";
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
export interface AppointmentsResultsDTO {
    client: ClientDTO;
    granted: boolean;
}
//# sourceMappingURL=1-medical-examination.dto.d.ts.map