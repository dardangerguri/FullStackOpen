interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface CourseContentProps {
  courseParts: CoursePart[];
}

const Content = (props: CourseContentProps) => {
  return (
    <div>
      {props.courseParts.map((course: CoursePart) => (
        <p key={course.name}>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
