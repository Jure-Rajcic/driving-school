import { Injectable } from '@angular/core';
import { SocketService } from './socket-service';
import { SocketServiceWorker } from './socket-service-worker';
import { AppointmentDTO, MEDICAL_EXAMINATIOU_USER_SERVICE } from '@shared/dtos';

@Injectable({
    providedIn: 'root',
})
export class MedicalExaminationUserService extends SocketServiceWorker<AppointmentDTO, AppointmentDTO> {

    constructor() { super(MEDICAL_EXAMINATIOU_USER_SERVICE); }

    onRealTimeUpdate(data: AppointmentDTO): void {
        console.log('Received Medical Examination Result:', data);
    }

    simulateRequest(): void {
        // this.emitRealTimeUpdate({'userId': 123, 'steps': [{'stepId': 1, 'success': true}]});
    }
}