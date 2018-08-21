import * as express from 'express';

import { loadDailySentence } from '../../app/utils/Api';

export default async function dailySentence(
  request: express.Request, response: express.Response) {
  const data = await loadDailySentence();
  response
    .type('application/json')
    .send(data);
}
