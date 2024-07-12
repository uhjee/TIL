const swagger_options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'OJT Todolist API',
      version: '0.1.0',
      description: '',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {},
    },
    servers: [
      {
        url: 'http://192.168.143.63:3002',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

module.exports = {
  swagger_options,
};
