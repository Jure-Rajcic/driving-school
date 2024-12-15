import { io } from 'socket.io-client';
import { IDENTIFY, IdentifyDTO } from '@shared/dtos';
import { Injectable } from '@angular/core';

type eventHandler = (data: any) => void;

@Injectable({
    providedIn: 'root',
})
export class SocketClientService {
    protected readonly serverSocket = io('http://localhost:3000');
    private readonly eventHandlers = new Map<string, eventHandler>();

    constructor() {
        this.subscribeToSocketEvents();
    }

    public bindEventCallback(event: string, eventCallback: eventHandler): void {
        this.eventHandlers.set(event, eventCallback);
        console.log(`Registered handler for event: ${event}`);
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
        if (port === 4200) return { id: 1, role: 'admin' };
        else return { id: 1, role: 'user' };
    }

    // Forward the event to the appropriate handler
    private forwardEventToHandler(event: string, data: any): void {
        console.log(`forwarding event: ${event} to handler: ${this.eventHandlers.get(event)}`);
        const eventCallback = this.eventHandlers.get(event);
        if (eventCallback) eventCallback(data);
        else console.warn(`No handler found for event: ${event}`);
    }

    // Offer a way to emit events to the server from every handler
    public sendSocketEvent(event: string, data: any): void {
        console.log(`Emitting event: ${event} with data: ${data} to server`);
        this.serverSocket.emit(event, data);
    }


}