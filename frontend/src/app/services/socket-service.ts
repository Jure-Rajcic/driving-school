import { io } from 'socket.io-client';
import { Injectable } from '@angular/core';
import { SocketServiceWorker } from './socket-service-worker';

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    protected readonly socket = io('http://localhost:3000');
    private readonly workers = new Map<string, SocketServiceWorker<any, any>>();

    constructor() {
        this.startListening();
    }

    registerWorker<REQ, RES>(worker: SocketServiceWorker<REQ, RES>): void {
        this.workers.set(worker.event, worker);
        console.log(`Registered worker for event: ${worker.event}`);
    }

    // Offer a way to emit events to the server from every worker
    emit<REQ, RES>(worker: SocketServiceWorker<REQ, RES>, data: any): void {
        console.log(`Emitting event: ${worker.event}`, data);
        this.socket.emit(worker.event, data);
    }

    // Listen for all events and forward them to the appropriate worker
    private startListening(): void {
        this.socket.onAny((event, data) => {
            console.log(`Received event: ${event}`, data);
            const worker = this.workers.get(event);
            if (worker) {
                worker.onRealTimeUpdate(data);
            } else {
                console.warn(`No worker found for event: ${event}`);
            }
        });
    }
}