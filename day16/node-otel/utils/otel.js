const { NodeSDK } = require('@opentelemetry/sdk-node');
const {
    OTLPTraceExporter,
} = require('@opentelemetry/exporter-trace-otlp-http');
const {
    getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const {
    ATTR_SERVICE_VERSION,
    ATTR_SERVICE_NAME,
} = require('@opentelemetry/semantic-conventions');
const { Resource } = require('@opentelemetry/resources');

const { JAEGER_URL } = require('./config');

// 自定義服務的名稱以及版本號
const resource = new Resource({
    [ATTR_SERVICE_NAME]: 'nodejs-service-01',
    [ATTR_SERVICE_VERSION]: '1.0.0',
});

// 設定trace data要傳到哪裡
const traceExporter = new OTLPTraceExporter({
    url: JAEGER_URL,
});

const otelSdk = new NodeSDK({
    traceExporter: traceExporter,
    instrumentations: [getNodeAutoInstrumentations()],
    resource: resource,
});

module.exports = {
    otelSdk,
};
