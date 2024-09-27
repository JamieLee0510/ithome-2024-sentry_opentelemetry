// 記錄sum duration就好

class MockHistogram {
    constructor(name, options) {
        this.name = name;
        this.description = options.description;
        this.unit = options.unit || 'ms';
        this.sum = 0;
        this.context = null;
    }
    // 記錄數據
    record(value, context) {
        this.sum += value;
        // TODO: 刷新context還是如何
        this.context = context;
    }
}

class MockMeter {
    constructor() {
        // for simple storage
        this._histograms = [];
    }

    createHistogram(name, options) {
        const histogram = new MockHistogram(name, options);
        this._histograms.push(histogram);
        return histogram;
    }

    getHistogram() {
        return this._histograms;
    }
}

module.exports = {
    MockHistogram,
    MockMeter,
};
