class SelfSentry {
    static setupExpressErrorHandler(expressApp) {
        expressApp.use(this._expressErrorHandler());
    }

    static _expressErrorHandler() {
        return (err, req, res, next) => {
            // 這邊就是處理Sentry上報error的邏輯，目前先console出來
            console.log('----in SelfSentry error middleware');
            console.error(err.stack);
            next(error);
        };
    }
}

module.exports = {
    SelfSentry,
};
