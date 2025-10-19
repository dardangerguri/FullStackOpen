import type { NonSensitiveDiaryEntry } from "../types";

interface DiaryListProps {
  diaries: NonSensitiveDiaryEntry[];
}

const DiaryList = ({ diaries }: DiaryListProps) => {
  return (
    <div>
      <h3> Diary entries </h3>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h4>{diary.date}</h4>
          visibility: {diary.visibility} <br />
          weather: {diary.weather}
        </div>
      ))}
    </div>
  );
};

export default DiaryList;
