import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatientEntry } from '../utils';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientsService.getNonSensitivePatients();
  res.json(patients);
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

export default router;
