const hook = require('require-in-the-middle');

const demoStart = () => {
    // 攔截 exporess
    hook(['express'], (exports) => {
        const original = exports;
        return (...args) => {
            const app = original(...args);

            console.log('---while during requiring express');
            return app;
        };
    });
};

module.exports = {
    demoStart,
};
