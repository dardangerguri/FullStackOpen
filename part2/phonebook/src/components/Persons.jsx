const Persons = ({persons, handleDeletePerson}) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
          <button onClick={() => handleDeletePerson(person.id, person.name)}>delete</button>
        </div>
      ))}
    </div>
  )
}

export default Persons
