import React from "react";
import { HospitalEntry, Diagnosis } from "../../types";
import { LocalHospital } from "@mui/icons-material";

interface Props {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntryView: React.FC<Props> = ({ entry, diagnoses }) => (
  <div style={{ border: "1px solid", borderRadius: 6, padding: 10, margin: "10px 0" }}>
    {entry.date} <LocalHospital /> <br />

    <em>{entry.description}</em> <br />

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

    Discharge: {entry.discharge.date} – {entry.discharge.criteria} <br />
    diagnose by {entry.specialist} <br />
  </div>
);

export default HospitalEntryView;
