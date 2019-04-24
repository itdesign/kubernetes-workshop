import express from 'express';
import axios from 'axios';

import { renderResult } from './components/ResultComponent';
import { renderIndex } from './components/IndexComponent';
import { renderError } from './components/ErrorComponent';

const port = process.env.PORT || '8081';
const calculatorServerBaseUrl = process.env.CALCULATOR_SERVER_BASE_URL || 'http://localhost:8080';

const app: express.Express = express();

app.listen(port, () => console.log(`Started calculator service on port ${port}.`));

app.get('/', (_, resp: express.Response) => resp.send(renderIndex()));

app.get('/result', async (req: express.Request, resp: express.Response) => {
  try {
    const response = await axios.get<{ result: number }>(
      `${calculatorServerBaseUrl}/api/calculate?expression=${encodeURIComponent(req.query.expression)}`
    );
    resp.send(renderResult({ result: response.data.result }));
  } catch (error) {
    resp.send(renderError({ error: error.message }));
  }
});
