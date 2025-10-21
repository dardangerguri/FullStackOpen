import patients from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatientEntry, NewEntryWithoutId, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientById = (id: string) : Patient | undefined => {
  return patients.find(p => p.id === id);
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const id = uuid();
  const newPatient = {
    id,
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};

const addNewEntry = (entry: NewEntryWithoutId, patientId: string): Entry => {
  const entryId = uuid();
  const newEntry = {
    id: entryId,
    ...entry
  };
  const patient = patients.find(patient => patient.id === patientId);
  if (!patient)
    throw new Error('Incorrect id');
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatientById,
  getNonSensitivePatients,
  addPatient,
  addNewEntry
};
