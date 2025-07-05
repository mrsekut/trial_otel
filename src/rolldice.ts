import { Span, trace } from '@opentelemetry/api';

const tracer = trace.getTracer('usecase');

export function rollTheDice(rolls: number, min: number, max: number) {
  return tracer.startActiveSpan('usecase:rollTheDice', async (span: Span) => {
    const result = Array.from({ length: rolls }, (_, i) =>
      rollOnce(i, min, max),
    );

    span.setAttribute('dice.result', result);
    span.setAttribute('dice.count', result.length);
    span.end();
    return result;
  });
}

function rollOnce(i: number, min: number, max: number) {
  return tracer.startActiveSpan(`rollOnce:${i}`, (span: Span) => {
    const result = Math.floor(Math.random() * (max - min + 1) + min);
    span.end();
    return result;
  });
}
