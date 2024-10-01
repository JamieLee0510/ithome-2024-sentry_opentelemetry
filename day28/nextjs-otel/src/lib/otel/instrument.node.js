import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { Resource } from '@opentelemetry/resources';
import {
    ATTR_SERVICE_VERSION,
    ATTR_SERVICE_NAME,
} from '@opentelemetry/semantic-conventions';

import { otelResource, exporterEndpoint } from './resource';

export const initNodeOtel = () => {
    // 自定義服務的名稱以及版本號
    const resource = new Resource({
        [ATTR_SERVICE_NAME]: otelResource.NAME,
        [ATTR_SERVICE_VERSION]: otelResource.VERSION,
    });

    const logExporter = new OTLPLogExporter({
        url: exporterEndpoint.log,
    });

    const metricExporter = new OTLPMetricExporter({
        url: exporterEndpoint.metric,
        headers: {},
    });

    const traceExporter = new OTLPTraceExporter({
        url: exporterEndpoint.trace,
    });

    const otelSdk = new NodeSDK({
        logExporter,
        traceExporter: traceExporter,
        resource,
        instrumentations: [
            getNodeAutoInstrumentations({
                // disable `instrumentation-fs` because it's bloating the traces
                '@opentelemetry/instrumentation-fs': {
                    enabled: false,
                },
                '@opentelemetry/instrumentation-http': {
                    // ignore certain requests
                    ignoreIncomingRequestHook: (request) => {
                        const ignorePatterns = [
                            /^\/_next\/static.*/,
                            /\/?_rsc=*/,
                            /favicon/,
                        ];

                        if (
                            request.url &&
                            ignorePatterns.some((m) => m.test(request.url))
                        ) {
                            return true;
                        }

                        return false;
                    },

                    // rewrite span names from HTTP [METHOD] to the path
                    requestHook: (span, request) => {
                        span.setAttributes({
                            name: `${request.method} ${request.url}`,
                        });
                    },
                },
            }),
        ],
        metricExporter: metricExporter,
        metricInterval: 60000, // 設定採集間隔（ms）
    });

    otelSdk.start();
};
