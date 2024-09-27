const hook = require('require-in-the-middle');

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
                        this.traceContext = null;
                    });
                    next();
                });
                return app;
            };
        });
    }

    _tracingHandler(req) {
        let traceId;
        let version;
        let traceFlag;
        let parentSpan;
        if (!req.headers['traceparent']) {
            // init traceparent and related item
            req.headers['traceparent'] = '';
            version = '00';
            traceFlag = '01';
        } else {
            const traceContextArr = req.headers['traceparent'].split('-');
            traceId = traceContextArr[1];
            version = traceContextArr[0];
            traceFlag = traceContextArr[3];
            parentSpan = traceContextArr[2];
        }

        // 理論上這個span name是一個 operation，但目前就直接mock http
        const newSpan = this.tracer.startSpan('mock-http', {
            traceId,
            parentSpanId: parentSpan,
            version,
            traceFlag,
        });

        return newSpan;
    }
}

module.exports = MyTracingSDK;
