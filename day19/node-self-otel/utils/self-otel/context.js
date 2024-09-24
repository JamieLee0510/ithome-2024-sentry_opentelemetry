class Contextmanager {
    constructor() {
        this.activateContext = new Map();
    }

    setActive(context, requestId) {
        this.activeContexts.set(requestId, context);
    }

    getActive(requestId) {
        return this.activeContexts.get(requestId);
    }
}

module.exports = {
    context: new Contextmanager(),
};
