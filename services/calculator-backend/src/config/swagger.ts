// Specification can be found at https://swagger.io/specification/
// Validation can be done with https://editor.swagger.io

export const swaggerJson = {
  swagger: '2.0',
  info: {
    description: 'This is the API documentation of the calculator server.',
    version: '1.0.0',
    title: 'Calculator Server'
  },
  paths: {
    '/api/calculate': {
      get: {
        summary: 'Get the result of a given expression',
        produces: ['application/json'],
        parameters: [
          {
            name: 'expression',
            in: 'query',
            type: 'string',

            description: 'The expression which should be used to calculate the result',
            required: true
          }
        ],
        responses: {
          '200': {
            description: 'Successful calculation',
            schema: {
              type: 'object',
              properties: {
                result: {
                  type: 'string'
                },
                instance: {
                  type: 'string'
                }
              }
            }
          }
        }
      }
    },
    '/api/history': {
      get: {
        summary: 'Show a history of the last calculations',
        produces: ['application/json'],
        responses: {
          '200': {
            description: 'History',
            schema: {
              type: 'object',
              properties: {
                records: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      expression: {
                        type: 'string'
                      },
                      result: {
                        type: 'string'
                      }
                    }
                  }
                },
                instance: {
                  type: 'string'
                }
              }
            }
          }
        }
      }
    }
  }
};
