import { io } from 'socket.io-client';
import { Injectable } from '@angular/core';
import { SocketServiceWorker } from './socket-service-worker';
import { IDENTIFY, IdentifyDTO, MEDICAL_EXAMINATION_ADMIN_SERVICE } from '@shared/dtos';

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    protected readonly socket = io('http://localhost:3000');
    private readonly workers = new Map<string, SocketServiceWorker<any, any>>();

    constructor() {
        this.subscribeToSocketEvents();
    }

    attachSocketServiceWorker<REQ, RES>(worker: SocketServiceWorker<REQ, RES>): void {
        this.workers.set(worker.service, worker);
        console.log(`Registered worker for event: ${worker.service}`);
    }

    // Offer a way to emit events to the server from every worker
    triggerSocketEvent<REQ, RES>(worker: SocketServiceWorker<REQ, RES>, data: any): void {
        console.log(`Emitting event: ${worker.service} socket.id:`, this.socket.id, 'data:', data);
        this.socket.emit(worker.service, data);
    }

    // Listen for all events and forward them to the appropriate worker
    private subscribeToSocketEvents(): void {
        this.socket.onAny((event: string, data: any) => {
            switch (event) {
                case IDENTIFY:
                    const dto: IdentifyDTO = { role: 'admin', id: 123 };
                    this.socket.emit(IDENTIFY, dto);
                    break;
                default:
                    this.delegateToWorkers(event, data);
            }
        });
    }

    private delegateToWorkers(event: string, data: any): void {
        console.log(`Delegating event: ${event} to workers`);
        const worker = this.workers.get(event);
        if (worker) {
            worker.onRealTimeUpdate(data);
        } else {
            console.warn(`No worker found for event: ${event}`);
        }
    }
}