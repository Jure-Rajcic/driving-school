
export const IDENTIFY = 'identify';

export type role = 'admin' | 'user';
export interface IdentifyDTO {
    id: number;
    role: role;
}
