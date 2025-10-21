import React from "react";
import { OccupationalHealthcareEntry, Diagnosis } from "../../types";
import { Work } from "@mui/icons-material";

interface Props {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntryView: React.FC<Props> = ({ entry, diagnoses }) => (
  <div style={{ border: "1px solid", borderRadius: 6, padding: 10, margin: "10px 0" }}>
    {entry.date} <Work /> <i>{entry.employerName}</i> <br />
    <em>{entry.description}</em> <br />
    diagnose by {entry.specialist} <br />

    {entry.sickLeave && (
      <p>
        Sick leave: {entry.sickLeave.startDate} – {entry.sickLeave.endDate}
      </p>
    )}

    {entry.diagnosisCodes && (
      <ul style={{ marginTop: 5 }}>
        {entry.diagnosisCodes.map(code => {
          const diag = diagnoses.find(d => d.code === code);
          return (
            <li key={code}>
              {code} {diag ? `: ${diag.name}` : ""}
            </li>
          );
        })}
      </ul>
    )}
  </div>
);

export default OccupationalHealthcareEntryView;

