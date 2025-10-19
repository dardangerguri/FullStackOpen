export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {

};

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  gender: Gender;
  dateOfBirth: string;
  occupation: string;
  entries: Entry[];
};

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<Patient, 'id'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
};
