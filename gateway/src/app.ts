import express, { Express } from 'express';
import { auth } from './middleware/auth.js';
import cors from 'cors';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import axios from 'axios';
import swaggerUi from 'swagger-ui-express';
import { apiDocumentation } from './docs/apidoc.js';
//import { logger } from './logger.js';

const app: Express = express();

const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(options));

app.use(express.json()); // WE NO NEED PARSE JSON IN PROXY MODE, JUST TRANSFER IT NEXT! (THE ONLY way using with  fixRequestBody from 'http-proxy-middleware')
//app.use(express.urlencoded({ extended: false }));

const apiProxyAuth = createProxyMiddleware({
  target: 'http://localhost:3005',
  changeOrigin: true,
  onProxyReq: fixRequestBody,
});

app.use('/register', apiProxyAuth);
app.use('/login', apiProxyAuth);
app.use('/token', [auth, apiProxyAuth]);

const apiProxyApplicationOffer = createProxyMiddleware({
  target: 'http://localhost:3003',
  changeOrigin: true,
  pathRewrite: {
    '^/application/apply': '/application/offer',
  },
  onProxyReq: fixRequestBody,
  logLevel: 'info',
});

app.use('/application/apply', [auth, apiProxyApplicationOffer]);

const apiProxyApplicationCalc = createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true,
  pathRewrite: {
    '^/application/registration': '/deal/calculate', // rewrite path
  },
  onProxyReq: fixRequestBody,
  logLevel: 'info',
});

app.use('/application/registration', [auth, apiProxyApplicationCalc]);

const apiProxyApplication = createProxyMiddleware({
  target: 'http://localhost:3003',
  changeOrigin: true,
  onProxyReq: fixRequestBody,
  logLevel: 'info',
});

app.use('/application', [auth, apiProxyApplication]);

const apiProxyDocument = createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true,
  onProxyReq: fixRequestBody,
  pathRewrite: {
    '^/document': '/deal/document', // rewrite path
  },
  logLevel: 'info',
});

app.use('/document', [auth, apiProxyDocument]);

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(apiDocumentation));

app.post('/test', async (req, res) => {
  try {
    console.log('Authorization: ' + req.headers.authorization);
    const response = await axios.get('http://localhost:3005/token', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: req.headers.authorization,
      },
      data: req.body,
    });
    res.status(200).send(response.data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    } else res.status(400).send({ error: 'unexpected error' });
  }
});

export default app;
