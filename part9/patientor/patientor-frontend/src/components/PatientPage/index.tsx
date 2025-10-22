import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Male, Female, Transgender, ErrorOutline} from "@mui/icons-material";
import { Button } from "@mui/material";

import { Patient, Diagnosis } from "../../types";
import patientService from "../../services/patients";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "../AddEntryModal";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  const fetchPatient = useCallback( async () => {
    if (!id)
      return;
    try {
      const data = await patientService.getById(id);
      setPatient(data);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    void fetchPatient();
  }, [fetchPatient]);

  const handleEntryAdded = async () => {
    setShowAddForm(false);
    setErrorMessage(null);
    await fetchPatient();
  };

  const handleEntryError = (error: string) => {
    setErrorMessage(error);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setErrorMessage(null);
  };

  if (!patient) return <p>Loading...</p>;

  const genderIcon = {
    male: <Male />,
    female: <Female />,
    other: <Transgender />,
  }[patient.gender];

  return (
    <div>
      <h2>{patient.name} {genderIcon}</h2>
      ssn: {patient.ssn} <br />
      occupation: {patient.occupation}
      {errorMessage && (
        <div style={{
          backgroundColor: '#ffebee',
          color: '#c62828',
          padding: '10px',
          margin: '10px 0',
          borderRadius: '4px',
          border: '1px solid #ffcdd2',
          display: 'flex',
          alignItems: 'center',
        }}>
          <ErrorOutline style={{ marginRight: 8 }} />
          <span>{errorMessage}</span>
        </div>
      )}

      {showAddForm && (
        <AddEntryForm
          patientId={patient.id}
          diagnoses={diagnoses}
          onEntryAdded={handleEntryAdded}
          onError={handleEntryError}
          onCancel={handleCancel}
        />
      )}

      <h3>entries</h3>
      {patient.entries.map(entry => (
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}

      <Button onClick={() => setShowAddForm(true)} variant="contained" color="primary">
        ADD NEW ENTRY
      </Button>

    </div>
  );
};

export default PatientPage;
