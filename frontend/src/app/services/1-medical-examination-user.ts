import { Injectable } from '@angular/core';
import { SocketService } from './socket-service';
import { SocketEventHandler } from './socket-event-handler';
import { AppointmentDTO, MEDICAL_EXAMINATIOU_USER_SERVICE } from '@shared/dtos';

@Injectable({
    providedIn: 'root',
})
export class MedicalExaminationUserService extends SocketEventHandler<AppointmentDTO> {

    constructor() { super(MEDICAL_EXAMINATIOU_USER_SERVICE); }

    handleEvent(data: AppointmentDTO): void {
        console.log('Received Medical Examination Result:', data);
    }

    simulateRequest(): void {
        // this.emitRealTimeUpdate({'userId': 123, 'steps': [{'stepId': 1, 'success': true}]});
    }
}