type result = 'success' | 'error';
export interface ResultWrapper<T> {
    result: result;
    data: T;
}
export declare class SuccessResult<T> implements ResultWrapper<T> {
    data: T;
    result: result;
    constructor(data: T);
}
export {};
//# sourceMappingURL=result.wrapper.d.ts.map