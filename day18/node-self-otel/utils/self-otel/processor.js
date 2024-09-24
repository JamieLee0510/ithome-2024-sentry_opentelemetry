class MockExporter {
    export(spans) {
        spans.forEach((span) => {
            console.log(span);
            // TODO: send span to mock collector
        });
    }
}

class SimpleSpanProcessor {
    constructor(exporter) {
        this.exporter = exporter;
    }
    onEnd(span) {
        this.exporter.export([span]); // 傳送 span 到 Exporter
    }
}

module.exports = {
    MockExporter,
    SimpleSpanProcessor,
};
