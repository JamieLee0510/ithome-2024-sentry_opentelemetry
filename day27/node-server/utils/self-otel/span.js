class Span {
    constructor(traceId, spanId, parentSpanId, name, processor) {
        this.traceId = traceId;
        this.spanId = spanId;
        this.parentSpanId = parentSpanId;
        this.name = name;
        this.processor = processor;

        // recording start date time
        this.startTime = Date.now();
    }

    end() {
        // recording end date time
        this.endTime = Date.now();
        const duration = this.endTime - this.startTime;
        console.log(
            `Span ${this.spanId} (${this.name}) ended. Duration: ${duration}ms`,
        );

        // send this span to SpanProcessor
        this.processor.onEnd(this);
    }
}

module.exports = Span;
