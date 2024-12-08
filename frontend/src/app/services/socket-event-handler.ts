
import { io } from 'socket.io-client';
import { inject, Injectable } from '@angular/core';
import { MedicalExaminationUserService } from './1-medical-examination-user';
import { SocketService } from './socket-service';

export abstract class SocketEventHandler<RES> {

    public readonly event: string;
    private readonly socketService = inject(SocketService);

    constructor(event: string) {
        console.log(`Creating worker for serviceIdentity: ${event}`);
        this.event = event;
        this.socketService.addSocketEventHandler(this);
    }

    abstract handleEvent(data: RES): void;
}

