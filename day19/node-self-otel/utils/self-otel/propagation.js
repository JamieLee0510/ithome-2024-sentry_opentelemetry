class Propagation {
    /**
     *
     * @param {*} context
     * @param {*} headers
     *
     * inject context into headers as `traceparent`
     */
    inject(context, headers) {
        const traceparent = `00-${context.traceId}-${context.spanId}-01`;
        headers['traceparent'] = traceparent;
    }

    /**
     *
     * @param {*} headers
     * @returns context
     *
     * get trace context from headers['traceparent']
     */
    extract(headers) {
        const traceparent = headers['traceparent'];
        if (traceparent) {
            const parts = traceparent.split('-');
            return {
                traceId: parts[1],
                spanId: parts[2],
            };
        }
        return { traceId: '', spanId: '' };
    }
}

module.exports = {
    propagation: new Propagation(),
};
