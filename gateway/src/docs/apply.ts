const apply = {
  tags: ['apply'],
  description: 'apply offer/ you must specify field: "applicationId" !!!',
  operationId: 'apply',
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/loanOfferDTO',
        },
      },
    },
    required: true,
  },
  responses: {
    '201': {
      description: 'offer applied successfully!',
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

const loanOfferDTO = {
  type: 'object',
  properties: {
    applicationId: {
      type: 'number',
      example: 22,
    },
    requestedAmount: {
      type: 'number',
      example: 120000,
    },
    totalAmount: {
      type: 'number',
      example: 123000,
    },
    term: {
      type: 'number',
      example: 6,
    },
    monthlyPayment: {
      type: 'number',
      example: 21041.48,
    },
    rate: {
      type: 'number',
      example: 9,
    },
    isInsuranceEnabled: {
      type: 'boolean',
      example: true,
    },
    isSalaryClient: {
      type: 'boolean',
      example: true,
    },
  },
};

export { apply, loanOfferDTO };
