type Sender = 'admin' | 'user';
type Recipient = 'admin' | 'user';
export interface SenderWrapper<T> {
    sender: Sender;
    recipient: Recipient;
    payload: T;
}
export {};
//# sourceMappingURL=sender.wrapper.d.ts.map