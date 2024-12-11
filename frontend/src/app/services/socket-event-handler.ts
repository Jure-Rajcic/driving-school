
import { io } from 'socket.io-client';
import { inject, Injectable } from '@angular/core';
import { SocketService } from './socket-service';

export abstract class SocketEventHandler<RES> {

    public readonly event: string;
    private readonly socketService = inject(SocketService);

    constructor(event: string) {
        this.event = event;
        this.socketService.addSocketEventHandler(this);
    }

    abstract handleEvent(data: RES): void;
}

