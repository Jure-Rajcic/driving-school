
import { io } from 'socket.io-client';
import { inject, Injectable } from '@angular/core';
import { MedicalExaminationUserService } from './1-medical-examination-user';
import { SocketService } from './socket-service';

// export interface Descriptor<T> {
//     readonly sender: 'user' | 'admin',
//     readonly reciver: 'user' | 'admin' | 'all',
//     readonly data: T,
// }


export abstract class SocketEventHandler<RES> {

    public readonly event: string;
    private readonly socketService = inject(SocketService);

    constructor(event: string) {
        console.log(`Creating worker for serviceIdentity: ${event}`);
        this.event = event;
        this.socketService.addSocketEventHandler(this);
    }

    abstract onRealTimeUpdate(data: RES): void;
}

