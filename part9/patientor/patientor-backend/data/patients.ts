import { Patient, Gender } from '../src/types';

const data: Patient[] = [
    {
        "id": "d2773336-f723-11e9-8f0b-362b9e155667",
        "name": "John McClane",
        "ssn": "090786-122X",
        "occupation": "New york city cop",
        "gender": Gender.Male,
        "dateOfBirth": "1986-07-09",
        "entries": []
    },
    {
        "id": "d2773598-f723-11e9-8f0b-362b9e155667",
        "name": "Martin Riggs",
        "ssn": "300179-77A",
        "occupation": "Cop",
        "gender": Gender.Male,
        "dateOfBirth": "1979-01-30",
        "entries": []
    },
    {
        "id": "d27736ec-f723-11e9-8f0b-362b9e155667",
        "name": "Hans Gruber",
        "ssn": "250470-555L",
        "occupation": "Technician",
        "gender": Gender.Other,
        "dateOfBirth": "1970-04-25",
        "entries": []
    },
    {
        "id": "d2773822-f723-11e9-8f0b-362b9e155667",
        "name": "Dana Scully",
        "ssn": "050174-432N",
        "occupation": "Forensic Pathologist",
        "gender": Gender.Female,
        "dateOfBirth": "1974-01-05",
        "entries": []
    },
    {
        "id": "d2773c6e-f723-11e9-8f0b-362b9e155667",
        "name": "Matti Luukkainen",
        "ssn": "090471-8890",
        "occupation": "Digital evangelist",
        "gender": Gender.Male,
        "dateOfBirth": "1971-04-09",
        "entries": []
    }
];

export default data;
