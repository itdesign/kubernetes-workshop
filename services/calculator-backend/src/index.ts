import express, { response } from 'express';
import os from 'os';
import path from 'path';

import { calculator } from './backend/calculator';
import { getHistory, addToHistory } from './backend/history';
import { swaggerJson } from './config/swagger';

const port = process.env.PORT || '8080';
const instance = os.hostname();

const app: express.Express = express();

app.get('/swagger.json', (_, resp: express.Response) => resp.send(swaggerJson));
app.get('/', (_, resp: express.Response) => resp.sendFile(path.join(__dirname, '../static/index.html')));
//
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
