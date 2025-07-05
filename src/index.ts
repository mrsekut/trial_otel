await import('./instrumentation.js');
import { otel } from '@hono/otel';
import { Hono } from 'hono';
import { rollTheDice } from './rolldice.js';
import { buildSchema } from 'graphql';
import { schema as originSchema } from './graphql/schema.js';
import { graphqlServer } from '@hono/graphql-server';

const app = new Hono();
app.use('*', otel());
const schema = buildSchema(originSchema);

const rootResolver = () => ({
  hello: () => 'Hello Hono GraphQL!',
  rollTheDice: async ({ rolls = 1, min = 1, max = 6 }) => {
    return await rollTheDice(rolls, min, max);
  },
});

app.use(
  '/graphql',
  graphqlServer({
    schema,
    rootResolver,
    graphiql: true,
  }),
);

export default app;
