const hook = require('require-in-the-middle');
const http = require('http');
const https = require('https');
const { propagation } = require('./propagation');
const Tracer = require('./tracer');
const { MockExporter, SimpleSpanProcessor } = require('./processor');

class MyTracingSDK {
    constructor(serviceName) {
        this.exporter = new MockExporter();
        this.processor = new SimpleSpanProcessor(this.exporter);
        this.tracer = new Tracer(serviceName, this.processor);
        this.isStarted = false;
    }

    // 啟動sdk，攔截HTTP請求
    start() {
        if (this.isStarted) {
            console.log('MyTracingSDK 已經啟動');
            return;
        }

        this.isStarted = true;
        console.log('MyTracingSDK 初始化完成');

        // 攔截 express requiring
        hook(['express'], (exports) => {
            const original = exports;
            return (...args) => {
                const app = original(...args);

                // auto imply middleware
                app.use((req, res, next) => {
                    console.log('intercept - express middleware');

                    // 攔截請求，生成span
                    const currSpan = this._tracingHandler(req); // 記錄請求

                    // 當請求結束時，結束 span
                    res.on('finish', () => {
                        currSpan.end();
                    });
                    next();
                });
                return app;
            };
        });

        this._interceptHttp();
    }

    _interceptHttp() {
        console.log('Tracing SDK 已啟動，攔截 HTTP 請求...');
        this.originalHttpsRequest = http.request;
        // 攔截發起的 HTTP 請求，附上 traceparent header
        http.request = (options, callback) => {
            // 記錄請求
            const currSpan = this._tracingHandler(options);
            // 注入trace context
            propagation.inject(
                { traceId: currSpan.traceId, spanId: currSpan.spanId },
                options.headers,
            );
            const req = this.originalHttpsRequest(options, (response) => {
                // 當請求完成時，結束 span
                currSpan.end();
                if (callback) callback(response);
            });

            req.on('error', (error) => {
                console.error(`Request error: ${error.message}`);
                currSpan.end(); // 當請求失敗時也結束 span
            });
            return req;
        };
    }

    _tracingHandler(req) {
        const { traceId, spanId } = propagation.extract(req.headers);

        // 理論上這個span name是一個 operation，但目前就直接mock http
        const newSpan = this.tracer.startSpan('mock-http', {
            traceId,
            parentSpanId: spanId,
        });

        return newSpan;
    }
}

module.exports = MyTracingSDK;
