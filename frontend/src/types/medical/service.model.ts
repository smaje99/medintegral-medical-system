import { DoctorInService } from './doctor.model';
import type { Specialty } from './specialty.model';

export interface Service {
  id: string;
  name: string;
  description: string;
  cost: number;
  duration: number;
  isActive: boolean;
}

export type ServiceCreate = Omit<Service, 'id' | 'isActive'> & {
  specialtyId: Specialty['id'];
};

export type ServiceUpdate = Omit<Partial<Service>, 'id'>;

export type ServiceWithSpecialty = Service & {
  readonly doctors: DoctorInService[];
  readonly specialty: Specialty;
};
