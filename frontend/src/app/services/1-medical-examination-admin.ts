import { Injectable, signal } from '@angular/core';
import { SocketService } from './socket-service';
import { AppointmentDTO, MEDICAL_EXAMINATION_ADMIN_SERVICE} from '@shared/dtos';
import { SocketServiceWorker } from './socket-service-worker';

@Injectable({
    providedIn: 'root',
})
export class MedicalExaminationAdminService extends SocketServiceWorker<AppointmentDTO, AppointmentDTO> {

    constructor() { super(MEDICAL_EXAMINATION_ADMIN_SERVICE); }

    onRealTimeUpdate(data: AppointmentDTO): void {
        console.log('AppointmentDTO Result:', data);
        this.addAppointment(data);
    }


    readonly demo: AppointmentDTO = {'date': '2021-01-01', 'time': '12:00', 'location': 'New York'};
    simulateRequest(): void {
        this.emitRealTimeUpdate(this.demo);
    }

    appointments = signal<AppointmentDTO[]>([]);
    addAppointment(appointment: AppointmentDTO) {
        this.appointments.set([...this.appointments(), appointment]);
    }
}