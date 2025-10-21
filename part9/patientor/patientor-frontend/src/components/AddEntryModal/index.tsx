import React, { useState } from 'react';
import patientService from '../../services/patients';
import { Button } from "@mui/material";

interface Props {
  patientId: string;
  onEntryAdded: () => void;
  onError: (error: string) => void;
  onCancel: () => void;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  border: 'none',
  borderBottom: '1px solid rgba(0,0,0,0.3)',
  padding: '6px 4px',
  outline: 'none',
  fontSize: '14px',
  background: 'transparent',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '12px',
  color: '#747272ff',
  marginBottom: '6px',
  marginTop: '12px'
};

const AddEntryForm: React.FC<Props> = ({ patientId, onEntryAdded, onError, onCancel }) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onError('');

    const entry = {
      type: 'HealthCheck',
      description,
      date,
      specialist,
      healthCheckRating: Number(healthCheckRating),
      diagnosisCodes: diagnosisCodes ? diagnosisCodes.split(',').map(c => c.trim()) : []
    };

    try {
      await patientService.addEntry(patientId, entry);
      setDescription('');
      setDate('');
      setSpecialist('');
      setHealthCheckRating('');
      setDiagnosisCodes('');
      onEntryAdded();
    } catch (err: unknown) {
      const getResponseData = (e: unknown) => {
        if (typeof e === 'object' && e !== null && 'response' in e) {
          return (e as { response?: { data?: unknown } }).response?.data;
        }
        return undefined;
      };

      const msgFromResp = getResponseData(err);
      const msg = msgFromResp ?? (err instanceof Error ? err.message : undefined) ?? 'Failed to add entry';

      onError(Array.isArray(msg) ? msg.join(', ') : String(msg));
    }
  };

  return (
    <div style={{ border: '2px dotted #333', marginTop: 18, padding: '18px', marginBottom: '18px', borderRadius: 4, background: '#fff' }}>
      <h4 style={{ margin: 0, marginBottom: 12, fontWeight: 700 }}>New HealthCheck entry</h4>

      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Description</label>
        <input style={inputStyle} value={description} onChange={(e) => setDescription(e.target.value)} />

        <label style={labelStyle}>Date</label>
        <input style={inputStyle} value={date} onChange={(e) => setDate(e.target.value)} placeholder="YYYY-MM-DD" />

        <label style={labelStyle}>Specialist</label>
        <input style={inputStyle} value={specialist} onChange={(e) => setSpecialist(e.target.value)} />

        <label style={labelStyle}>Healthcheck rating</label>
        <input style={inputStyle} value={healthCheckRating} onChange={(e) => setHealthCheckRating(e.target.value)} type="number" />

        <label style={labelStyle}>Diagnosis codes</label>
        <input style={inputStyle} value={diagnosisCodes} onChange={(e) => setDiagnosisCodes(e.target.value)} />

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 18, alignItems: 'center' }}>
          <Button onClick={onCancel}  variant="contained"  sx={{background: '#d4215dff'}}>
            CANCEL
          </Button>

          <Button type="submit"  variant="contained"  sx={{background: '#eee', color: '#111'}}>
            ADD
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddEntryForm;
