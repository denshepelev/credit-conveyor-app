## Description

Implementation of the credit pipeline. Next API operation logic implemented:

POST: /conveyor/offers

POST: /conveyor/calculation

Application uses technology stack: Node.js®  [Node.js®](https://nodejs.org/) and code [TypeScript](http://www.typescriptlang.org/) .

Frameworks and modules: class-validator , express, properties-reader

## Request example using postman

1. <http://localhost:3000/conveyor/offers>

method: POST

raw/json

body:
{
  "amount": 120000,
  "term": 8,
  "firstName": "Denis",
  "lastName": "Shepelev",
  "middleName": "Valerievich",
  "email": "denisshepelev@mail.ru",
  "birthDate": "1987-06-28",
  "passportSeries": "5555",
  "passportNumber": "555555"
}

2. <http://localhost:3000//conveyor/calculation>

method: POST

raw/json

body:
{
    "amount": 150000,
    "term": 8,
    "firstName": "Denis",
    "lastName": "Shepelev",
    "middleName": "Valerievich",
    "gender": "MALE",
    "birthDate": "1987-06-28",
    "passportSeries": "6666",
    "passportNumber": "666666",
    "passportIssueDate": "1987-06-28",
    "passportIssueBranch": "passportIssueBranch",
    "maritalStatus": "SINGLE",
    "dependentAmount": 0,
    "employment": {
        "employmentStatus": "EMPLOYED",
        "employerINN": "777777",
        "salary": 50000,
        "position": "MID_MANAGER",
        "workExperienceTotal": 50,
        "workExperienceCurrent": 20
    },
    "account": "account",
    "isInsuranceEnabled": true,
    "isSalaryClient": true
}

## Installation

```bash
npm install
```

## Running the app

```bash
npm start
```

## Test

```bash
# unit tests
$ npm run test
```

## Docker

```bash
# build with specific tag
$ docker build . -t creditConveyorMicroservice
# show images list
$ docker images
# run image using ports
$ docker run -p 3000:3000 -d creditConveyorMicroservice
# show containers list
$ docker ps
# interactive mode/get into container
$ docker exec -it <container id> /bin/bash
```