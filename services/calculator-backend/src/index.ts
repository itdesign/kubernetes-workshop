import express from 'express';
import os from 'os';
import swaggerUi from 'swagger-ui-express';

import { calculator } from './backend/calculator';
import { swaggerJson } from './config/swagger';
import { getHistory, addToHistory } from './backend/history';

const port = process.env.PORT || '8080';
const instance = os.hostname();

const app: express.Express = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.get('/', (req: express.Request, resp: express.Response) => resp.redirect('./docs'));

app.get('/api/calculate', async (req: express.Request, resp: express.Response) => {
  const result = await calculator(req.query.expression);
  addToHistory({ expression: req.query.expression, result });
  resp.send({ result, instance });
});

app.get('/api/history', async (req: express.Request, resp: express.Response) => {
  const records = await getHistory();
  resp.send({ records, instance });
});

app.listen(port, () => console.log(`Started calculator service on port ${port}.`));

// Enable future proof error handling for uncaught rejected promises
process.on('unhandledRejection', error => {
  console.log(`Caught an unhandled promise rejection "${error.messsage}". Will exit process...`, error);
  process.exit(1);
});
