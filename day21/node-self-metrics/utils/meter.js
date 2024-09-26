class MockHistogram {
    constructor(name, options) {
        this.name = name;
        this.description = options.description;
        this.unit = options.unit || 'ms';
        this.buckets = [0.1, 0.5, 1, 5, 10]; // 预定义的桶区间
        this.bucketCounts = new Array(this.buckets.length + 1).fill(0);
        this.sum = 0;
        this.count = 0;
    }
    // 記錄數據
    record(value, labels = {}) {
        const durationInSeconds = value / 1000;
        this.count += 1;
        this.sum += durationInSeconds;

        for (let i = 0; i < this.buckets.length; i++) {
            if (durationInSeconds <= this.buckets[i]) {
                this.bucketCounts[i] += 1;
                return;
            }
        }
        this.bucketCounts[this.buckets.length] += 1;
    }
}

class MockMeter {
    constructor() {
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
