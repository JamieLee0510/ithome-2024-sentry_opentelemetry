const http = require('http');

class MockPrometheusExporter {
    constructor(meter) {
        this._meter = meter;
        this.histories = [];
    }

    init() {
        const server = http.createServer((req, res) => {
            if (req.url === '/metrics') {
                this._formatMetricsForPrometheus();
                console.log('---this.histories:', this.histories);
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                let text = '';
                this.histories.forEach((history) => {
                    text += '\n';
                    text += history;
                });
                res.end(text);
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
            }
        });

        server.listen(9469, () => {
            console.log('Metrics available at http://localhost:9469/metrics');
        });
    }

    _formatMetricsForPrometheus() {
        const histograms = this._meter.getHistogram();
        if (histograms.length) {
            histograms.forEach((histogram) => {
                const newFormatedRecords = this._formatForPrometheus(histogram);
                this.histories.unshift(newFormatedRecords);
            });
        }
    }
    _formatForPrometheus(histogram) {
        return `${histogram.name}--${JSON.stringify(histogram.context)} : ${histogram.sum}`;
    }
}

module.exports = {
    MockPrometheusExporter,
};
