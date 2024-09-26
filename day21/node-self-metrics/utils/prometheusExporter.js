const http = require('http');

class MockPrometheusExporter {
    constructor(meter) {
        this.meter = meter;
        this.init();
    }

    _init() {
        const server = http.createServer((req, res) => {
            if (req.url === '/metrics') {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(this._formatMetricsForPrometheus());
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
            }
        });

        server.listen(9464, () => {
            console.log('Metrics available at http://localhost:9464/metrics');
        });
    }

    _formatMetricsForPrometheus() {
        let result = '';

        const histograms = this.meter.getHistograms(); // 从 meter 获取所有 histograms
        histograms.forEach((histogram) => {
            result += this._formatForPrometheus(histogram);
            result += '\n';
        });
    }
    _formatForPrometheus(histogram) {
        // TODO:
    }
}

module.exports = {
    MockPrometheusExporter,
};
