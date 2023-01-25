const registration = {
  tags: ['application_id'],
  description: 'finish registration',
  operationId: 'registration',
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/finishRegistrationRequestDTO',
        },
      },
    },
    required: true,
  },
  parameters: [
    {
      name: 'applicationId',
      in: 'path',
      description: 'Application ID',
      required: true,
      type: 'string',
    },
  ],
  responses: {
    '201': {
      description: 'finished registration successfully!',
    },

    '500': {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Internal Server Error',
              },
            },
          },
        },
      },
    },
  },
};

const finishRegistrationRequestDTO = {
  type: 'object',
  properties: {
    gender: {
      type: 'string',
      example: 'MALE',
    },
    maritalStatus: {
      type: 'string',
      example: 'MARRIED',
    },
    dependentAmount: {
      type: 'number',
      example: 0,
    },
    passportIssueDate: {
      type: 'string',
      example: '1987-06-28',
    },
    passportIssueBranch: {
      type: 'string',
      example: 'passportIssueBranch',
    },
    employment: {
      type: 'object',
      properties: {
        employmentStatus: {
          type: 'string',
          example: 'EMPLOYED',
        },
        employerINN: {
          type: 'string',
          example: '777777',
        },
        salary: {
          type: 'number',
          example: 50000,
        },
        position: {
          type: 'string',
          example: 'MID_MANAGER',
        },
        workExperienceTotal: {
          type: 'number',
          example: 50,
        },
        workExperienceCurrent: {
          type: 'number',
          example: 20,
        },
      },
    },
    isInsuranceEnabled: {
      type: 'boolean',
      example: true,
    },
    isSalaryClient: {
      type: 'boolean',
      example: true,
    },
    account: {
      type: 'string',
      example: 'denisshepelev@mail.ru',
    },
  },
};

export { registration, finishRegistrationRequestDTO };
/*
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
    "account": "account"
}*/
