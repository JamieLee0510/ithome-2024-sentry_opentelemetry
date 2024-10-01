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
import {
    ATTR_SERVICE_VERSION,
    ATTR_SERVICE_NAME,
} from '@opentelemetry/semantic-conventions';

import { otelResource, exporterEndpoint } from './resource';

export const initBrowserOtel = () => {
    const resource = new Resource({
        [ATTR_SERVICE_NAME]: otelResource.NAME,
        [ATTR_SERVICE_VERSION]: otelResource.VERSION,
    });

    const traceProvider = new WebTracerProvider({ resource });
    const traceExporter = new OTLPTraceExporter({
        url: exporterEndpoint.trace,
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
                propagateTraceHeaderCorsUrls: /.*/,
            }),
        ],
        tracerProvider: traceProvider,
    });
};
