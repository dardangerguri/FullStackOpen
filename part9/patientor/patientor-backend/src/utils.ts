import { z } from 'zod';
import { NewPatientEntry, Gender, NewEntryWithoutId, Diagnose } from "./types";

export const NewPatientEntrySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
  ssn: z.string().min(1, { message: "SSN is required" }),
  gender: z.nativeEnum(Gender, { message: "Invalid gender" }),
  occupation: z.string().min(1, { message: "Occupation is required" }),
  entries: z.array(z.any()).default([])
}).strict();

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewPatientEntrySchema.parse(object);
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnose['code']>;
  }

  return object.diagnosisCodes as Array<Diagnose['code']>;
};

export const toNewEntry = (object: unknown): NewEntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Invalid entry data');
  }

  const entry = object as any;

  if (!entry.type || !entry.date || !entry.specialist || !entry.description) {
    throw new Error('Missing required fields');
  }

  const baseEntry = {
    date: entry.date,
    specialist: entry.specialist,
    description: entry.description,
    diagnosisCodes: parseDiagnosisCodes(entry)
  };

  switch (entry.type) {
    case 'HealthCheck':
      return {
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating: entry.healthCheckRating
      };

    case 'Hospital':
      return {
        ...baseEntry,
        type: 'Hospital',
        discharge: entry.discharge
      };

    case 'OccupationalHealthcare':
      return {
        ...baseEntry,
        type: 'OccupationalHealthcare',
        employerName: entry.employerName,
        sickLeave: entry.sickLeave
      };

    default:
      throw new Error('Invalid entry type');
  }
};
