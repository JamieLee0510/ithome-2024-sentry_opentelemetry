import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import {
    BatchSpanProcessor,
    SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-web';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
// import { ZoneContextManager } from '@opentelemetry/context-zone';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';

export const initOtel = () => {
    console.log('--initOtel');
    const serviceName = 'react-demo-otel';
    const resource = new Resource({ 'service.name': serviceName });

    const traceProvider = new WebTracerProvider({ resource });
    const traceExporter = new OTLPTraceExporter({
        url: 'http://localhost:4318/v1/traces',
    });

    const spanProcessor = new SimpleSpanProcessor(traceExporter);
    traceProvider.addSpanProcessor(spanProcessor);

    // Register the provider
    traceProvider.register();

    // Auto-instrumentations
    registerInstrumentations({
        instrumentations: [
            getWebAutoInstrumentations(),
            new FetchInstrumentation({
                propagateTraceHeaderCorsUrls: [
                    new RegExp(/http:\/\/localhost:3030\/.*/),
                ],
            }),
            new XMLHttpRequestInstrumentation({
                propagateTraceHeaderCorsUrls: [
                    new RegExp(/http:\/\/localhost:3030\/.*/),
                ],
            }),
        ],
        tracerProvider: traceProvider,
    });
};
