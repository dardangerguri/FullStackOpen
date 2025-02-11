const Header = ({course}) => <h1>{course}</h1>

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

const Course = ({course}) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
  </div>
)

export default Course
