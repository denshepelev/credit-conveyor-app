const code = {
  tags: ['code'],
  description: 'sign document with SES code/ specify SES code in request!!!!',
  operationId: 'code',
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/codeDTO',
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
    '200': {
      description: 'sign document with SES code successfully!',
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

const codeDTO = {
  type: 'object',
  properties: {
    ses: {
      type: 'string',
      example: '523576',
    },
  },
};

export { code, codeDTO };
