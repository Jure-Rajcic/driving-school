import { Injectable } from '@angular/core';
import { SocketService } from './socket-service';
import { MedicalExaminationResultDTO, MEDICAL_EXAMINATION_RESULT} from '@shared/dtos';
import { SocketServiceWorker } from './socket-service-worker';

@Injectable({
    providedIn: 'root',
})
export class MedicalExaminationService extends SocketServiceWorker<MedicalExaminationResultDTO, MedicalExaminationResultDTO> {

    constructor() { super(MEDICAL_EXAMINATION_RESULT); }

    onRealTimeUpdate(data: MedicalExaminationResultDTO): void {
        console.log('Received Medical Examination Result:', data);
    }

    simulateRequest(): void {
        this.emitRealTimeUpdate({'userId': 123, 'steps': [{'stepId': 1, 'success': true}]});
    }
}