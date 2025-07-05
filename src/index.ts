import { otel } from '@hono/otel'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node'
import { Hono } from 'hono'

const sdk = new NodeSDK({
  traceExporter: new ConsoleSpanExporter(),
})

sdk.start()

const app = new Hono()

app.use('*', otel())
app.get('/', (c) => c.text('foo'))

export default app