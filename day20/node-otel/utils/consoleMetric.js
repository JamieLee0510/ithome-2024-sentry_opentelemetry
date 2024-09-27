const { NodeSDK } = require('@opentelemetry/sdk-node');
const {
    getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const {
    ATTR_SERVICE_VERSION,
    ATTR_SERVICE_NAME,
} = require('@opentelemetry/semantic-conventions');
const { Resource } = require('@opentelemetry/resources');
const {
    OTLPMetricExporter,
} = require('@opentelemetry/exporter-metrics-otlp-http');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');
const {
    MeterProvider,
    ConsoleMetricExporter,
    PeriodicExportingMetricReader,
} = require('@opentelemetry/sdk-metrics');

// 自定義服務的名稱以及版本號
const resource = new Resource({
    [ATTR_SERVICE_NAME]: 'nodejs-service-01',
    [ATTR_SERVICE_VERSION]: '1.0.0',
});
// 创建 ConsoleMetricExporter，用于将指标输出到控制台
const consoleMetricExporter = new ConsoleMetricExporter();
const metricReader = new PeriodicExportingMetricReader({
    exporter: consoleMetricExporter,
    exportIntervalMillis: 1000, // 每秒输出一次指标到控制台
});

const otelSdk = new NodeSDK({
    metricReader: metricReader, // 使用 ConsoleMetricExporter 代替 PrometheusExporter
    instrumentations: [getNodeAutoInstrumentations()],
    resource: resource,
    metricInterval: 1000, // 指定指标收集的间隔时间（毫秒）
});

otelSdk.start();
