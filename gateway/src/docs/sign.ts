const sign = {
  tags: ['sign'],
  description: 'sign document request',
  operationId: 'sign',
  security: [
    {
      bearerAuth: [],
    },
  ],
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
      description: 'sign document successfully!',
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

export { sign };
