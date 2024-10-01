export const otelResource = {
    NAME: 'nextjs-demo-otel',
    VERSION: '1.0.0',
};

export const exporterEndpoint = {
    trace: 'http://localhost:4318/v1/traces',
    metric: 'http://localhost:4318/v1/metrics',
    log: 'http://localhost:4318/v1/logs',
};
