import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatientEntry, toNewEntry } from '../utils';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientsService.getNonSensitivePatients();
  res.json(patients);
});

router.get('/:id', (req, res) => {
  const patient = patientsService.getPatientById(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).json({ error: "Patient not found" });
  };
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.status(201).json(addedPatient);
  } catch (e: unknown) {
    if (e instanceof z.ZodError) {
      res.status(400).json({ error: e.issues });
    } else if (e instanceof Error) {
      res.status(400).json({ error: e.message });
    } else {
      res.status(400).json({ error: 'Something went wrong.' });
    }
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientsService.addNewEntry(newEntry, req.params.id);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: '  + error.message;
    }
    res.status(400).json(errorMessage);
  }
});

export default router;
