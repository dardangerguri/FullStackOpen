import React, { useState } from 'react';
import patientService from '../../services/patients';
import { Button } from "@mui/material";
import { MenuItem, Checkbox, TextField } from "@mui/material";
import { Diagnosis } from '../../types';

interface Props {
  patientId: string;
  onEntryAdded: () => void;
  onError: (error: string) => void;
  onCancel: () => void;
  diagnoses: Diagnosis[];
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
  marginTop: '30px'
};

const AddEntryForm: React.FC<Props> = ({ patientId, onEntryAdded, onError, onCancel, diagnoses }) => {
  const [type, setType] = useState<'HealthCheck' | 'Hospital' | 'OccupationalHealthcare'>('HealthCheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onError('');

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
    const entry: any = {
      type,
      description,
      date,
      specialist,
      ...(diagnosisCodes.length ? { diagnosisCodes } : {})
    };

    if (type === 'HealthCheck') {
      entry.healthCheckRating = Number(healthCheckRating);
    }

    if (type === 'Hospital') {
      entry.discharge = {
        date: dischargeDate,
        criteria: dischargeCriteria
      };
    }

    if (type === 'OccupationalHealthcare') {
      entry.employeeName = employeeName;
      if (sickLeaveStart && sickLeaveEnd) {
        entry.sickLeave = { startDate: sickLeaveStart, endDate: sickLeaveEnd };
      }
    }

    try {
      await patientService.addEntry(patientId, entry);
      setDescription('');
      setDate('');
      setSpecialist('');
      setHealthCheckRating('');
      setDiagnosisCodes([]);
      setDischargeDate('');
      setDischargeCriteria('');
      setEmployeeName('');
      setSickLeaveStart('');
      setSickLeaveEnd('');
      setType('HealthCheck');
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
      <h4 style={{ margin: 0, marginBottom: 12, fontWeight: 700 }}>New Entry</h4>

      <form onSubmit={handleSubmit}>

        <label style={labelStyle}>Entry Type</label>
        <TextField
          fullWidth
          variant="standard"
          select
          value={type}
          onChange={(e) => setType(e.target.value as 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare')}
        >
          <MenuItem value="HealthCheck">HealthCheck</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
        </TextField>

        <label style={labelStyle}>Description</label>
        <input style={inputStyle} value={description} onChange={(e) => setDescription(e.target.value)} />

        <label style={labelStyle}>Date</label>
        <input style={inputStyle} type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <label style={labelStyle}>Specialist</label>
        <input style={inputStyle} value={specialist} onChange={(e) => setSpecialist(e.target.value)} />

        <label style={labelStyle}>Diagnosis Codes</label>
        <TextField
          fullWidth
          variant="standard"
          select
          SelectProps={{
            multiple: true,
            renderValue: (selected) => (selected as string[]).join(', ')
          }}
          value={diagnosisCodes}
          onChange={(e) => setDiagnosisCodes(e.target.value as unknown as string[])}
        >
          {diagnoses.map(d => (
            <MenuItem key={d.code} value={d.code}>
              <Checkbox checked={diagnosisCodes.indexOf(d.code) > -1} />
              {d.code} {d.name}
            </MenuItem>
          ))}
        </TextField>

        {type === 'HealthCheck' && (
          <>
            <label style={labelStyle}>HealthCheck rating</label>
            <input style={inputStyle} type="number" value={healthCheckRating} onChange={(e) => setHealthCheckRating(e.target.value)} />
          </>
        )}

        {type === 'Hospital' && (
          <>
            <label style={labelStyle}>Discharge date</label>
            <input style={inputStyle} type="date" value={dischargeDate} onChange={(e) => setDischargeDate(e.target.value)} />

            <label style={labelStyle}>Discharge criteria</label>
            <input style={inputStyle} value={dischargeCriteria} onChange={(e) => setDischargeCriteria(e.target.value)} />
          </>
        )}

        {type === 'OccupationalHealthcare' && (
          <>
            <label style={labelStyle}>Employee</label>
            <input style={inputStyle} value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} />

            <label style={labelStyle}>Sick leave start date</label>
            <input style={inputStyle} type="date" value={sickLeaveStart} onChange={(e) => setSickLeaveStart(e.target.value)} />

            <label style={labelStyle}>Sick leave end date</label>
            <input style={inputStyle} type="date" value={sickLeaveEnd} onChange={(e) => setSickLeaveEnd(e.target.value)} />
          </>
        )}

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
