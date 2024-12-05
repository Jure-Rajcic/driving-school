
import { io } from 'socket.io-client';
import { inject, Injectable } from '@angular/core';
import { MedicalExaminationResultDTO } from '@shared/dtos';
import { MedicalExaminationService } from './carousel-page-service-1-medical-examination';
import { SocketService } from './socket-service';

// export interface Descriptor<T> {
//     readonly from: 'user' | 'admin',
//     readonly to: 'user' | 'admin' | 'all',
//     readonly data: T,
// }

export abstract class SocketServiceWorker<REQ, RES> {

    public readonly event: string;
    private readonly socketService = inject(SocketService);

    constructor(event: string) {
        this.event = event;
        this.socketService.registerWorker(this);
    }

    emitRealTimeUpdate(data: REQ): void {
        this.socketService.emit(this, data);
    }

    abstract onRealTimeUpdate(data: RES): void;


}

