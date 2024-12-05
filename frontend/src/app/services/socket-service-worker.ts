
import { io } from 'socket.io-client';
import { inject, Injectable } from '@angular/core';
import { MedicalExaminationUserService } from './1-medical-examination-user';
import { SocketService } from './socket-service';

// export interface Descriptor<T> {
//     readonly sender: 'user' | 'admin',
//     readonly reciver: 'user' | 'admin' | 'all',
//     readonly data: T,
// }


export abstract class SocketServiceWorker<REQ, RES> {

    public readonly service: string;
    private readonly socketService = inject(SocketService);

    constructor(service: string) {
        console.log(`Creating worker for serviceIdentity: ${service}`);
        this.service = service;
        this.socketService.attachSocketServiceWorker(this);
    }

    emitRealTimeUpdate(data: REQ): void {
        this.socketService.triggerSocketEvent(this, data);
    }

    abstract onRealTimeUpdate(data: RES): void;


}

