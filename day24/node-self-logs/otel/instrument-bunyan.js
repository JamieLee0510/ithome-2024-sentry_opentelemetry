const hook = require('require-in-the-middle');

class MockBunyanInstrumentation {
    constructor() {}

    init(logExporter) {
        // 攔截 bunyan requiring，然後覆寫 createLoger 方法
        hook(['bunyan'], (exports) => {
            const originalCreateLogger = exports.createLogger;

            exports.createLogger = (...args) => {
                const logger = originalCreateLogger.apply(this, args);
                // 攔截 _emit 方法來獲取完整log
                const originalEmit = logger._emit;
                logger._emit = function (rec, noemit) {
                    // TODO: 整理成otel log 格式
                    logExporter.export(rec);

                    return originalEmit.call(this, rec, noemit);
                };
                return logger;
            };
            return exports;
        });
    }
}

module.exports = { MockBunyanInstrumentation };
