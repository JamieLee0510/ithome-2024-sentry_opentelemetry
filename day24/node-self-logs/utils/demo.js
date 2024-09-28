const hook = require('require-in-the-middle');

const demoOverwriteBanyan = () => {
    hook(['bunyan'], (exports) => {
        const originalCreateLogger = exports.createLogger;

        exports.createLogger = (...args) => {
            const logger = originalCreateLogger.apply(this, args);
            // 攔截 _emit 方法來獲取完整log
            const originalEmit = logger._emit;
            logger._emit = function (rec, noemit) {
                // `rec` 是完整的log 物件，包含所有日誌字段
                console.log('---Intercepted full log:', rec);

                // 繼續調用原始的 _emit 方法，確保log正常輸出
                return originalEmit.call(this, rec, noemit);
            };
            return logger;
        };
        return exports;
    });
};

demoOverwriteBanyan();

// module.exports = {
//     demoOverwriteBanyan,
// };
