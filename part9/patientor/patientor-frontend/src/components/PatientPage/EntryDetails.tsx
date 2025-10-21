import React from "react";
import { Entry, Diagnosis } from "../../types";
import HospitalEntryView from "./HospitalEntry";
import HealthCheckEntryView from "./HealthCheckEntry";
import OccupationalHealthcareEntryView from "./OccupationalHealthcareEntry";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const EntryDetails: React.FC<Props> = ({ entry, diagnoses }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryView entry={entry} diagnoses={diagnoses} />;
    case "HealthCheck":
      return <HealthCheckEntryView entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryView entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
