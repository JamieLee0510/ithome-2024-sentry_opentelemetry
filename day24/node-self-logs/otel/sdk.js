const { MockBunyanInstrumentation } = require('./instrument-bunyan');
const { MockLogExporter } = require('./log-exporter');
class SelfSdk {
    constructor() {
        this.logExporter = new MockLogExporter();
        this.instrument = new MockBunyanInstrumentation();
    }

    start() {
        this.instrument.init(this.logExporter);
    }
}

const selfSdk = new SelfSdk();

module.exports = { selfSdk };
