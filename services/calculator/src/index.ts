import express from 'express';
import { calculator } from './backend/calculator';
import path from 'path';

const port = process.env.PORT || '8080';
const app: express.Express = express();

app.get('/', (req: express.Request, resp: express.Response) => {
  resp.sendFile(path.join(__dirname + '/../src/frontend/index.html'));
});

app.get('/api/calculate', async (req: express.Request, resp: express.Response) => {
  const result = await calculator(req.query.expression);
  resp.send({ result });
});

app.listen(port, () => console.log(`Started calculator service on port ${port}.`));

// Enable future proof error handling for uncaught rejected promises
process.on('unhandledRejection', error => {
  console.log(`Caught an unhandled promise rejection "${error.messsage}". Will exit process...`, error);
  process.exit(1);
});
