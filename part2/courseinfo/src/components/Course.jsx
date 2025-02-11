const Header = ({course}) => <h3>{course}</h3>

const Content = ({parts}) => (
  <div>
    {parts.map((part) =>
      <Part key={part.id} part={part} />
    )}
  </div>
)

const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({parts}) => (
  <p>
    <strong>
      total of {parts.reduce((total, part) => total + part.exercises, 0)} exercises
    </strong>
  </p>
)

const CourseInfo = ({course}) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

const Course = ({courses}) => (
  <div>
    <h2>Web development curriculum</h2>
    {courses.map((course) =>
      <CourseInfo key={course.id} course={course} />
    )}
  </div>
)

export default Course
