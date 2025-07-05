await import('./instrumentation.js');
import { otel } from '@hono/otel';
import { Hono } from 'hono';

const app = new Hono();

app.use('*', otel());
app.get('/', c => c.text('foo'));

export default app;
