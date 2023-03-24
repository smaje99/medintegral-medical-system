export interface Specialty {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly image?: string;
}

export type SpecialtyCreate = Omit<Specialty, 'id'>;

export type SpecialtyUpdate = Partial<Omit<Specialty, 'id'>>