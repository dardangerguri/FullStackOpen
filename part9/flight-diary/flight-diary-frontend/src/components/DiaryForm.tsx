import { useState, type FormEvent } from "react";
import type { NewDiaryEntry } from "../types";
import { Weather, Visibility } from "../types";

interface DiaryFormProps {
  onAdd: (newDiary: NewDiaryEntry) => void;
  errorMessage: string;
}

const DiaryForm = ({ onAdd, errorMessage }: DiaryFormProps) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather | undefined>(undefined);
  const [visibility, setVisibility] = useState<Visibility | undefined>(undefined);
  const [comment, setComment] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!weather || !visibility)
      return;
    onAdd({ date, weather, visibility, comment });
    setDate("");
    setComment("");
    setWeather(undefined);
    setVisibility(undefined);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new entry</h2>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <div>
        <label>date: </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div>
        <label>visibility:</label>
        {Object.values(Visibility).map((v) => (
          <label key={v}>
            <input
              type="radio"
              name="visibility"
              value={v}
              checked={visibility === v}
              onChange={() => setVisibility(v)}
              required
            />
            {v}
          </label>
        ))}
      </div>

      <div>
        <label>weather:</label>
        {Object.values(Weather).map((w) => (
          <label key={w}>
            <input
              type="radio"
              name="weather"
              value={w}
              checked={weather === w}
              onChange={() => setWeather(w)}
              required
            />
            {w}
          </label>
        ))}
      </div>

      <div>
        <label>comment: </label>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>

      <button type="submit">add</button>
    </form>
  );
};

export default DiaryForm;
