const crypto = require('crypto');

const Span = require('./span');

// 生成隨機的 traceId 和 spanId
function generateId(bytes) {
    return crypto.randomBytes(bytes).toString('hex');
}

class Tracer {
    constructor(name, processor) {
        this.name = name;
        this.processor = processor;
    }

    startSpan(name, options) {
        // get trace id or create new trace id due to root
        const traceId =
            options && options.traceId ? options.traceId : generateId(16);
        const parentSpanId =
            options && options.parentSpanId ? options.parentSpanId : undefined;
        const spanId = generateId(8);

        console.log(
            `Starting span with traceId: ${traceId} and spanId: ${spanId}`,
        );

        return new Span(traceId, spanId, parentSpanId, name, this.processor);
    }
}

module.exports = Tracer;
