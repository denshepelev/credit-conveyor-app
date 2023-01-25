const send = {
  tags: ['send'],
  description: 'send document request',
  operationId: 'send',
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
      description: 'send document successfully!',
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

export { send };
