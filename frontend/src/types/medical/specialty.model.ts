import type { Service } from './service.model';

export interface Specialty {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly image?: string;
    readonly services?: Service[]
}

export type SpecialtyCreate = Omit<Specialty, 'id'>;

export type SpecialtyUpdate = Partial<Omit<Specialty, 'id'>>