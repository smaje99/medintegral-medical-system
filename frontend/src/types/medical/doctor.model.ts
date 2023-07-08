import { Person } from '../person';

export interface Doctor {
  readonly dni: number;
  readonly signature?: string;
  readonly name?: Person['name'];
  readonly surname?: Person['surname'];
}

export type DoctorCreate = Omit<Doctor, 'signature' | 'name' | 'surname'>;

export type DoctorUpdate = Partial<Omit<Doctor, 'dni' | 'name' | 'surname'>>;

export interface DoctorInService {
  readonly id: string;
  readonly serviceType: ServiceType;
  readonly session: Session;
  readonly isActive: boolean;
  readonly person: Person;
}

export enum ServiceType {
  IN_OF_IPS = 'presencial',
  OUT_OF_IPS = 'extramural',
}

export enum Session {
  MORNING = 'mañana',
  AFTERNOON = 'tarde',
  FULL_DAY = 'todo el día',
}
