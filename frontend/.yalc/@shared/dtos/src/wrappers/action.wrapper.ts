type action = 'add' | 'delete';
export interface ActionWrapper<T> {
    action: action;
    payload: T;
}
