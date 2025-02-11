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

const Total = ({parts}) => (
  <p>
    <strong>
      total of {parts.reduce((total, part) => total + part.exercises, 0)} exercises
    </strong>
  </p>
)

const Course = ({course}) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts}/>
  </div>
)

export default Course
