import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Male, Female, Transgender } from "@mui/icons-material";

import { Patient, Diagnosis } from "../../types";
import patientService from "../../services/patients";

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
      {(patient.entries || []).map((entry) => (
        <div
          key={entry.id}
        >
          <p>{entry.date} {entry.description}</p>
          {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
            <ul>
              {entry.diagnosisCodes.map((code) => {
                const diagnosis = diagnoses.find(d => d.code === code);
                return (
                  <li key={code}>
                    {code} {diagnosis ? `: ${diagnosis.name}` : ""}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default PatientPage;
