const login = {
  tags: ['login'],
  description: 'login user',
  operationId: 'login user',
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/loginDto',
        },
      },
    },
    required: true,
  },
  responses: {
    '200': {
      description: 'User logged in successfully!',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/loginResponseDto',
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

const loginResponseDto = {
  type: 'object',
  properties: {
    login: {
      type: 'string',
      example: 'denisshepelev@mail.ru',
    },
    role: {
      type: 'string',
      example: 'client',
    },
    token: {
      type: 'string',
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbmlzc2hlcGVsZXZAbWFpbC5ydSIsInJvbGUiOiJjbGllbnQiLCJpYXQiOjE2NzQ1Mzk3MTEsImV4cCI6MTY3NDU0MDYxMX0.Qx72MS9uXRHL4quX3fxF-fZaSWsuM3m11gVtBoNipHQ',
    },
  },
};

const loginDto = {
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
  },
};

export { login, loginDto, loginResponseDto };
