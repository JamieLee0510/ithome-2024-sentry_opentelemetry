const { MockHttpInstrumentation } = require('./instrument-http');
const { MockMeter } = require('./meter');
const { MockPrometheusExporter } = require('./prometheus-exporter');

class SelfSdk {
    constructor() {
        this.meter = new MockMeter();
        this.metricExporter = new MockHttpInstrumentation(this.meter);
        this.instruments = [new MockPrometheusExporter(this.meter)];
    }

    start() {
        this.instruments.forEach((instrument) => {
            instrument.init();
        });
        this.metricExporter.init();
    }
}

const selfSdk = new SelfSdk();

module.exports = { selfSdk };
