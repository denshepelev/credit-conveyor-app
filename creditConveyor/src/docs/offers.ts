const getOffers = {
  tags: ['Offers'],
  description: 'Get 4 offers',
  operationId: 'getOffers',
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/loanApplicationRequestDTO',
        },
      },
    },
    required: true,
  },
  responses: {
    '200': {
      description: 'We got array of 4 loanOfferDTO!',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              example: [
                {
                  applicationId: 4,
                  requestedAmount: 120000,
                  totalAmount: 123000,
                  term: 6,
                  monthlyPayment: 21041.48,
                  rate: 9,
                  isInsuranceEnabled: true,
                  isSalaryClient: true,
                },
                {
                  applicationId: 2,
                  requestedAmount: 120000,
                  totalAmount: 123000,
                  term: 6,
                  monthlyPayment: 21102.05,
                  rate: 10,
                  isInsuranceEnabled: true,
                  isSalaryClient: false,
                },
                {
                  applicationId: 3,
                  requestedAmount: 120000,
                  totalAmount: 120000,
                  term: 6,
                  monthlyPayment: 20646.55,
                  rate: 11,
                  isInsuranceEnabled: false,
                  isSalaryClient: true,
                },
                {
                  applicationId: 1,
                  requestedAmount: 120000,
                  totalAmount: 120000,
                  term: 6,
                  monthlyPayment: 20705.8,
                  rate: 12,
                  isInsuranceEnabled: false,
                  isSalaryClient: false,
                },
              ],
            },
          },
        },
      },
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

const loanApplicationRequestDTO = {
  type: 'object',
  properties: {
    amount: {
      type: 'number',
      example: 120000,
    },
    term: {
      type: 'number',
      example: 6,
    },
    firstName: {
      type: 'string',
      example: 'Denis',
    },
    lastName: {
      type: 'string',
      example: 'Shepelev',
    },
    middleName: {
      type: 'string',
      example: 'Valerievich',
    },
    email: {
      type: 'string',
      example: 'denisshepelev@mail.ru',
    },
    birthDate: {
      type: 'string',
      example: '1987-06-28',
    },
    passportSeries: {
      type: 'string',
      example: '6305',
    },
    passportNumber: {
      type: 'string',
      example: '555566',
    },
  },
};

export { getOffers, loanApplicationRequestDTO };

//[{"applicationId":4,"requestedAmount":120000,"totalAmount":123000,"term":6,"monthlyPayment":21041.48,"rate":9,"isInsuranceEnabled":true,"isSalaryClient":true},{"applicationId":2,"requestedAmount":120000,"totalAmount":123000,"term":6,"monthlyPayment":21102.05,"rate":10,"isInsuranceEnabled":true,"isSalaryClient":false},{"applicationId":3,"requestedAmount":120000,"totalAmount":120000,"term":6,"monthlyPayment":20646.55,"rate":11,"isInsuranceEnabled":false,"isSalaryClient":true},{"applicationId":1,"requestedAmount":120000,"totalAmount":120000,"term":6,"monthlyPayment":20705.8,"rate":12,"isInsuranceEnabled":false,"isSalaryClient":false}]'
