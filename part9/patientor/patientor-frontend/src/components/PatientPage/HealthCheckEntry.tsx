import React from "react";
import { HealthCheckEntry, Diagnosis, HealthCheckRating } from "../../types";
import { Favorite, LocalHospital } from "@mui/icons-material";

interface Props {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthCheckEntryView: React.FC<Props> = ({ entry, diagnoses }) => {
  const heartColor = {
    [HealthCheckRating.Healthy]: "green",
    [HealthCheckRating.LowRisk]: "yellow",
    [HealthCheckRating.HighRisk]: "orange",
    [HealthCheckRating.CriticalRisk]: "red",
  }[entry.healthCheckRating];

  return (
    <div style={{ border: "1px solid", borderRadius: 6, padding: 10, margin: "10px 0" }}>
      {entry.date} <LocalHospital /> <br />
      <em>{entry.description}</em> <br />

      <Favorite style={{ color: heartColor }} /> <br />

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

      diagnose by {entry.specialist}
    </div>
  );
};

export default HealthCheckEntryView;
