import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Male, Female, Transgender } from "@mui/icons-material";

import { Patient, Diagnosis } from "../../types";
import patientService from "../../services/patients";
import EntryDetails from "./EntryDetails";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id)
        return;
      try {
        const data = await patientService.getById(id);
        setPatient(data);
      } catch (error) {
        console.error(error);
      }
    };
    void fetchPatient();
  }, [id]);

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

      <h3>entries</h3>
      {patient.entries.map(entry => (
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default PatientPage;
