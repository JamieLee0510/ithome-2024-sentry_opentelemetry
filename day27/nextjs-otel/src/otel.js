import { NodeSDK, logs } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { Resource } from '@opentelemetry/resources';
import {
    ATTR_SERVICE_VERSION,
    ATTR_SERVICE_NAME,
} from '@opentelemetry/semantic-conventions';

// 自定義服務的名稱以及版本號
const resource = new Resource({
    [ATTR_SERVICE_NAME]: 'nextjs-service-demo',
    [ATTR_SERVICE_VERSION]: '1.0.0',
});

const logExporter = new OTLPLogExporter({
    url: 'http://localhost:4318/v1/logs',
});

const metricExporter = new OTLPMetricExporter({
    url: 'http://localhost:4318/v1/metrics',
    headers: {},
});

const traceExporter = new OTLPTraceExporter({
    url: 'http://localhost:4318/v1/traces',
});

const otelSdk = new NodeSDK({
    logExporter,
    traceExporter: traceExporter,
    resource,
    instrumentations: [getNodeAutoInstrumentations()],
    metricExporter: metricExporter,
    metricInterval: 60000, // 設定採集間隔（ms）
});

otelSdk.start();
