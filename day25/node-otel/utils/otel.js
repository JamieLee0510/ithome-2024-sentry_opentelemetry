const { NodeSDK, logs } = require('@opentelemetry/sdk-node');
const {
    getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const {
    OTLPMetricExporter,
} = require('@opentelemetry/exporter-metrics-otlp-http');
const {
    OTLPTraceExporter,
} = require('@opentelemetry/exporter-trace-otlp-http');
const { OTLPLogExporter } = require('@opentelemetry/exporter-logs-otlp-http');
const { Resource } = require('@opentelemetry/resources');
const {
    ATTR_SERVICE_VERSION,
    ATTR_SERVICE_NAME,
} = require('@opentelemetry/semantic-conventions');

// 自定義服務的名稱以及版本號
const resource = new Resource({
    [ATTR_SERVICE_NAME]: 'nodejs-service-demo',
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
