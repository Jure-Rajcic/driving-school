import { io } from 'socket.io-client';
import { Injectable } from '@angular/core';
import { SocketEventHandler } from './socket-event-handler';
import { IDENTIFY, IdentifyDTO, APPOINTMENT_MANAGEMENT_SERVICE } from '@shared/dtos';

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    protected readonly serverSocket = io('http://localhost:3000');
    private readonly handlers = new Map<string, SocketEventHandler<any>>();

    constructor() {
        this.subscribeToSocketEvents();
    }

    public addSocketEventHandler<RES>(handler: SocketEventHandler<RES>): void {
        this.handlers.set(handler.event, handler);
        console.log(`Registered handler for event: ${handler.event}`);
    }

    // Listen for all events and forward them to the appropriate handler
    private subscribeToSocketEvents(): void {
        this.serverSocket.onAny((event: string, data: any) => {
            switch (event) {
                case IDENTIFY:
                    const dto = this.createDummyIdentifyDto();
                    this.serverSocket.emit(IDENTIFY, dto);
                    break;
                default:
                    this.forwardEventToHandler(event, data);
            }
        });
    }

    // TODO remove this dummy DTO
    private createDummyIdentifyDto(): IdentifyDTO {
        const port = parseInt(window.location.port);
        if(port === 4200) return { id: 1, role: 'admin' };
         else return { id: 1, role: 'user' };
    }

    // Forward the event to the appropriate handler
    private forwardEventToHandler(event: string, data: any): void {
        console.log(`forwarding event: ${event} to handler: ${this.handlers.get(event)}`);
        const handler = this.handlers.get(event);
        if (handler) {
            handler.onRealTimeUpdate(data);
        } else {
            console.warn(`No handler found for event: ${event}`);
        }
    }

    // Offer a way to emit events to the server from every handler
    public sendSocketEvent<REQ>(event: string, data: REQ): void {
        console.log(`Emitting event: ${event} with data: ${data} to server`);
        this.serverSocket.emit(event, data);
    }


}