const { NodeSDK, logs } = require('@opentelemetry/sdk-node');
const {
    getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const { OTLPLogExporter } = require('@opentelemetry/exporter-logs-otlp-http');
const {
    SimpleLogRecordProcessor,
    ConsoleLogRecordExporter,
} = require('@opentelemetry/sdk-logs');
const { Resource } = require('@opentelemetry/resources');
const {
    ATTR_SERVICE_VERSION,
    ATTR_SERVICE_NAME,
} = require('@opentelemetry/semantic-conventions');
// getNodeAutoInstrumentations 會執行 instrumentation-bunyan

// 自定義服務的名稱以及版本號
const resource = new Resource({
    [ATTR_SERVICE_NAME]: 'nodejs-service-demo-logs',
    [ATTR_SERVICE_VERSION]: '1.0.0',
});

const logExporter = new OTLPLogExporter({
    url: 'http://localhost:4318/v1/logs', // 指向你的本地 OTLP Collector
});

const otelSdk = new NodeSDK({
    logRecordProcessor: logExporter,
    resource,
    instrumentations: [getNodeAutoInstrumentations()],
});

otelSdk.start();
