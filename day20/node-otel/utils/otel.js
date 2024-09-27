const { NodeSDK } = require('@opentelemetry/sdk-node');
const {
    getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');

const prometheusExporter = new PrometheusExporter({ port: 9464 }, () => {
    console.log(
        'prometheus metric data export to http://localhost:9464/metrics',
    );
});

const otelSdk = new NodeSDK({
    metricReader: prometheusExporter,
    instrumentations: [getNodeAutoInstrumentations()],
});

otelSdk.start();
