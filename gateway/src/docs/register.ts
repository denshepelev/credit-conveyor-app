const register = {
  tags: ['register'],
  description: 'register user',
  operationId: 'register user',
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/user',
        },
      },
    },
    required: true,
  },
  responses: {
    '201': {
      description: 'User created successfully!',
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

const user = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      example: 'denisshepelev@mail.ru',
    },
    password: {
      type: 'string',
      example: 666,
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
  },
};

export { register, user };
