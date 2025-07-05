await import('./instrumentation.js');
import { otel } from '@hono/otel';
import { Hono } from 'hono';
import { rollTheDice } from './rolldice.js';

const app = new Hono();

app.use('*', otel());
app.get('/', c => c.text('foo'));

app.get('/rolldice', async c => {
  // λ curl http://localhost:3000/rolldice?rolls=12
  const qRolls = c.req.query('rolls');
  const rolls = qRolls == null ? 1 : parseInt(qRolls.toString());
  return c.json(await rollTheDice(rolls, 1, 6));
});

export default app;
