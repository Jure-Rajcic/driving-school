export interface Sender {
    id: number;
    name: 'admin' | 'user';
}
export interface Recipient {
    id: number;
    name: 'admin' | 'user';
}
export interface ServerRoutingMessage<T> {
    sender: Sender;
    recipient: Recipient;
    payload: T;
}
//# sourceMappingURL=server.wrapper.d.ts.map