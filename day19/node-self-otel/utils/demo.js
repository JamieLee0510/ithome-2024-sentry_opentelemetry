const http = require('http');

const demoStart = () => {
    const originalHttp = http.request;

    http.request = (option, callback) => {
        console.log('---intercept HTTP request');
        return originalHttp(option, callback);
    };
};

module.exports = {
    demoStart,
};
