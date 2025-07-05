await import('./instrumentation.js');
import { otel } from '@hono/otel';
import { Hono } from 'hono';
import { buildSchema } from 'graphql';
import { schema as originSchema } from './graphql/schema.js';
import { graphqlServer } from '@hono/graphql-server';
import { createRootResolver } from './resolvers.js';

const app = new Hono();
app.use('*', otel());
const schema = buildSchema(originSchema);

app.use(
  '/graphql',
  graphqlServer({
    schema,
    rootResolver: createRootResolver,
    graphiql: true,
  }),
);

export default app;
