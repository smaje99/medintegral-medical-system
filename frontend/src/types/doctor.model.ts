export interface Doctor {
    readonly dni: number;
    readonly medicalLicenses: string[];
    readonly signature?: string;
}

export type DoctorCreate = Omit<Doctor, 'signature'>;