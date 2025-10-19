import { z } from 'zod';
import { NewPatientEntry, Gender } from "./types";

export const NewPatientEntrySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
  ssn: z.string().min(1, { message: "SSN is required" }),
  gender: z.nativeEnum(Gender, { message: "Invalid gender" }),
  occupation: z.string().min(1, { message: "Occupation is required" }),
  entries: z.array(z.object({})).default([])
}).strict();

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewPatientEntrySchema.parse(object);
};
