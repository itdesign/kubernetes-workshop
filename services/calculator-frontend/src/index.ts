import express from 'express';

import { renderCalculationResult } from './components/content/CacluclationResultContent';
import { renderIndex } from './components/content/IndexContent';
import { renderError } from './components/content/ErrorContent';
import { requestCalculate, requestHistory } from './utils/backend';
import { renderHistory } from './components/content/HistoryContent';
import { isHistoryEnabled } from './utils/appVersion';

const app: express.Express = express();

const port = process.env.PORT || '3000';
app.listen(port, () => console.log(`Started calculator service on port ${port}.`));
app.use(express.urlencoded({ extended: true }));

app.get('/', (_, resp: express.Response) => resp.send(renderIndex()));

app.post('/result', async (req: express.Request, resp: express.Response) => {
  const response = await requestCalculate(req.body.expression);
  if (response.type == 'SUCCESS') {
    resp.send(
      renderCalculationResult({
        expression: req.body.expression,
        result: response.data.result,
        backendInstance: response.data.instance
      })
    );
  } else {
    resp.send(renderError({ error: response.error }));
  }
});

if (isHistoryEnabled()) {
  app.get('/history', async (req: express.Request, resp: express.Response) => {
    const response = await requestHistory();
    if (response.type == 'SUCCESS') {
      resp.send(renderHistory({ records: response.data.records, backendInstance: response.data.instance }));
    } else {
      resp.send(renderError({ error: response.error }));
    }
  });
}
