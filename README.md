# CREDIT CONVEYOR MICROSERVICE PROJECT

## Description

Implementation of the credit pipeline. Next API operation logic implemented:

Application uses technology stack: Node.js®  [Node.js®](https://nodejs.org/) and code [TypeScript](http://www.typescriptlang.org/) .

Frameworks and modules: class-validator , express, properties-reader

## Swagger Documentation

<http://localhost:3006/documentation>

next API available:

post: /register

post: /login //body response with token. Use token with bearer authentication method

post: /application

put:  /application/apply

put:  /application/registration/{applicationId}

post: /document/{applicationId}/send

post: /document/{applicationId}/sign

post: /document/{applicationId}/code

## Request example using postman

1. <http://localhost:3006/register>

method: POST

raw/json

body:
{
    "email":"youremail@mail.ru",
    "password": "666",
    "firstName": "Denis",
    "lastName": "Shepelev",
    "middleName": "Valerievich"
}

response:

 status code 201

2.<http://localhost:3006/login>

method: POST

raw/json

body:
{
    "email":"youremail@mail.ru",
    "password": "666",
}

response:

status code: 200

response body example:

{
  "login": "youremail@mail.ru",
  "role": "client",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbmlzc2hlcGVsZXZAbWFpbC5ydSIsInJvbGUiOiJjbGllbnQiLCJpYXQiOjE2NzQ1Mzk3MTEsImV4cCI6MTY3NDU0MDYxMX0.Qx72MS9uXRHL4quX3fxF-fZaSWsuM3m11gVtBoNipHQ"
}

3.<http://localhost:3006/application>

method: POST

raw/json

body:
{
  "amount": 120000,
  "term": 8,
  "firstName": "Denis",
  "lastName": "Shepelev",
  "middleName": "Valerievich",
  "email": "youremail@mail.ru",
  "birthDate": "1987-06-28",
  "passportSeries": "5555",
  "passportNumber": "555555"
}

response:

status code: 200

response body example:

[
  [
    {
      "applicationId": 4,
      "requestedAmount": 120000,
      "totalAmount": 123000,
      "term": 6,
      "monthlyPayment": 21041.48,
      "rate": 9,
      "isInsuranceEnabled": true,
      "isSalaryClient": true
    },
    {
      "applicationId": 4,
      "requestedAmount": 120000,
      "totalAmount": 123000,
      "term": 6,
      "monthlyPayment": 21102.05,
      "rate": 10,
      "isInsuranceEnabled": true,
      "isSalaryClient": false
    },
    {
      "applicationId": 4,
      "requestedAmount": 120000,
      "totalAmount": 120000,
      "term": 6,
      "monthlyPayment": 20646.55,
      "rate": 11,
      "isInsuranceEnabled": false,
      "isSalaryClient": true
    },
    {
      "applicationId": 4,
      "requestedAmount": 120000,
      "totalAmount": 120000,
      "term": 6,
      "monthlyPayment": 20705.8,
      "rate": 12,
      "isInsuranceEnabled": false,
      "isSalaryClient": false
    }
  ]
]

4.<http://localhost:3006/application/apply>

method: PUT

raw/json

body:
{
    "applicationId": 15,      // applicationId, you will get it in response body API <http://localhost:3006/application>
    "requestedAmount": 120000,
    "totalAmount": 123000,
    "term": 6,
    "monthlyPayment": 21041.48,
    "rate": 9,
    "isInsuranceEnabled": true,
    "isSalaryClient": true
}

response:

status code: 201

5.<http://localhost:3006/application/registration/{applicationId}>

method: PUT

raw/json

body:
{
  "gender": "MALE",
  "maritalStatus": "MARRIED",
  "dependentAmount": 0,
  "passportIssueDate": "1987-06-28",
  "passportIssueBranch": "passportIssueBranch",
  "employment": {
    "employmentStatus": "EMPLOYED",
    "employerINN": "777777",
    "salary": 50000,
    "position": "MID_MANAGER",
    "workExperienceTotal": 50,
    "workExperienceCurrent": 20
  },
  "isInsuranceEnabled": true,
  "isSalaryClient": true,
  "account": "youremail@mail.ru"
}

response:

status code: 201

// on this step you should get approval via email

6.<http://localhost:3006/application/{applicationId}/send>

method: POST

response:

status code: 200

// on this step you should get LOAN AGREEMENT AND PROMISSORY NOTE via email

7.<http://localhost:3006/application/{applicationId}/sign>

method: POST

response:

status code: 200

// on this step you should get SES code via email

8.<http://localhost:3006/application/{applicationId}/code>

method: POST

raw/json

body:

{
  "ses": "523576"
}

response:

status code: 200

// on this step you should notification about credit issued via email

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
# build PROJECT
$ docker-compose up -d
```
