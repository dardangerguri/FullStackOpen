import axios from "axios";
import { useEffect, useState } from "react";
import DiaryForm from "./components/DiaryForm";
import DiaryList from "./components/DiaryList";
import type { NonSensitiveDiaryEntry, NewDiaryEntry } from "./types";
import diaryService from "./services/diaryService";

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    diaryService
      .getDiaries()
      .then((data) => setDiaries(data));
  }, []);

  const addDiary = async (newDiary: NewDiaryEntry) => {
    try {
      const addedDiary = await diaryService.addDiary(newDiary);
      setDiaries(prev => prev.concat(addedDiary));
      setErrorMessage("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.error || error.message || 'An error occurred');
      } else {
        setErrorMessage('Unknown Error');
      }

    }
  };

  return (
    <div>
      <DiaryForm onAdd={addDiary} errorMessage={errorMessage} />
      <hr />
      <DiaryList diaries={diaries} />
    </div>
  );
};

export default App;
