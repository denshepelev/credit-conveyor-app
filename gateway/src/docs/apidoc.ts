import { loanApplicationRequestDTO, application } from './application.js';
import { register, user } from './register.js';
import { login, loginDto, loginResponseDto } from './login.js';
import { apply, loanOfferDTO } from './apply.js';
import { registration, finishRegistrationRequestDTO } from './registration.js';
import { send } from './send.js';
import { sign } from './sign.js';
import { code, codeDTO } from './code.js';
const apiDocumentation = {
  openapi: '3.0.1',
  info: {
    version: '1.3.0',
    title: 'Credit Conveyor REST API - Documentation',
    description: 'API for study project - Credit Conveyor',
    termsOfService: 'https://mysite.com/terms',
    contact: {
      name: 'Denis Shepelev',
      email: 'denisshepelev@mail.ru',
      url: 'https://devwebsite.com',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  servers: [
    {
      url: 'http://localhost:3006/',
      description: 'Local Server',
    },
  ],
  tags: [
    {
      name: 'register',
    },
    {
      name: 'login',
    },
    {
      name: 'application',
    },
    {
      name: 'apply',
    },
    {
      name: 'application_id',
    },
    {
      name: 'send',
    },
    {
      name: 'sign',
    },
    {
      name: 'code',
    },
  ],
  paths: {
    '/register': {
      post: register,
    },
    '/login': {
      post: login,
    },
    '/application': {
      post: application,
    },
    '/application/apply': {
      put: apply,
    },
    '/application/registration/{applicationId}': {
      put: registration,
    },
    '/document/{applicationId}/send': {
      post: send,
    },
    '/document/{applicationId}/sign': {
      post: sign,
    },
    '/document/{applicationId}/code': {
      post: code,
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      loanApplicationRequestDTO,
      user,
      loginDto,
      loginResponseDto,
      loanOfferDTO,
      finishRegistrationRequestDTO,
      codeDTO,
    },
  },
};

export { apiDocumentation };
