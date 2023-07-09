import { Person } from '../person';
import { Service } from './service.model';

export interface Doctor {
  readonly dni: number;
  readonly signature?: string;
  readonly name?: Person['name'];
  readonly surname?: Person['surname'];
}

export type DoctorCreate = Omit<Doctor, 'signature' | 'name' | 'surname'>;

export type DoctorUpdate = Partial<Omit<Doctor, 'dni' | 'name' | 'surname'>>;

export interface ServiceDoctor {
  readonly id: string;
  readonly serviceId: Service['id'];
  readonly doctorId: Doctor['dni'];
  readonly serviceType: ServiceType;
  readonly session: Session;
  readonly isActive: boolean;
}

export type DoctorInService = Omit<ServiceDoctor, 'serviceId' | 'doctorId'> & {
  readonly person: Person;
};

export type DoctorInServiceCreate = Omit<ServiceDoctor, 'id' | 'isActive'>;

export enum ServiceType {
  IN_OF_IPS = 'presencial',
  OUT_OF_IPS = 'extramural',
}

export enum Session {
  MORNING = 'mañana',
  AFTERNOON = 'tarde',
  FULL_DAY = 'todo el día',
}
