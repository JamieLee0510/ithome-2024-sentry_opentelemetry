class SelfSentry {
    init() {
        window.onerror = this._errorHandler;
        window.onunhandledrejection = this._promiseErrorHandler;
    }

    _errorHandler(message, source, lineno, colno, error) {
        console.log(
            `Message:${message},\nSource:${source},\nLineon:${lineno},\nColno:${colno},\nError:${error}`,
        );
    }

    _promiseErrorHandler(event) {
        console.log(event);
    }
}

export const selfSentry = new SelfSentry();
