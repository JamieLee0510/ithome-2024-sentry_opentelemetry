const http = require('http');
const { hrTime, hrTimeDuration, hrTimeToMilliseconds } = require('./time');

class MockHttpInstrumentation {
    constructor(meter) {
        this.meter = meter;
        this._httpServerDurationHistogram = this.meter.createHistogram(
            'http.server.duration',
            {
                description: 'Measures the duration of inbound HTTP requests.',
                unit: 'ms',
            },
        );
        this._httpClientDurationHistogram = this.meter.createHistogram(
            'http.client.duration',
            {
                description: 'Measures the duration of outbound HTTP requests.',
                unit: 'ms',
            },
        );
    }

    // 記錄server response 的持續時間
    recordServerRequestDuration(req, res) {
        const startTime = hrTime();
        res.on('finish', () => {
            const endTime = hrTime();
            const duration = hrTimeToMilliseconds(
                hrTimeDuration(startTime, endTime),
            );
            this._httpServerDurationHistogram.record(duration, {
                method: req.method || 'GET',
                route: req.url || '/',
                status_code: res.statusCode,
            });
        });
    }

    // 記錄client request 的持續時間
    recordClientRequestDuration(req, res) {
        const startTime = hrTime();
        res.on('end', () => {
            const endTime = hrTime();
            const duration = hrTimeToMilliseconds(
                hrTimeDuration(startTime, endTime),
            );
            this._httpClientDurationHistogram.record(duration, {
                method: req.method || 'GET',
                host: req.getHeader('host'),
                status_code: req.statusCode,
            });
        });
    }

    // 攔截 http 並記錄
    init() {
        const originalHttpRequest = http.request;

        const instrumentation = this;

        // 代理 http.request
        http.request = function (...args) {
            const req = originalHttpRequest.apply(this, args);
            req.on('response', (res) => {
                instrumentation.recordClientRequestDuration(req, res);
            });
            return req;
        };

        // 攔截http.server並記錄服務端請求
        const originalEmit = http.Server.prototype.emit;
        http.Server.prototype.emit = function (event, ...args) {
            if (event === 'request') {
                console.log('---Instrumentation HTTP in http.Server');
                const [req, res] = args;
                instrumentation.recordServerRequestDuration(req, res);
            }
            return originalEmit.apply(this, [event, ...args]);
        };
    }
}

module.exports = { MockHttpInstrumentation };
