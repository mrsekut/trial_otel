import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';

const sdk = new NodeSDK({
  // アプリケーションの実行環境に関する情報を提供
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: 'hono-app',
  }),

  traceExporter: new OTLPTraceExporter({
    url: 'http://localhost:4317',
  }),

  // ノードの自動インストルメンテーションを有効化
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
