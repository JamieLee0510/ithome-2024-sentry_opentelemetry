class BatchProcessor {
    constructor(exporter) {
        this._exporter = exporter;
        this._maxExportBatchSize = 5;
        this._maxQueueSize = 10;
        this._scheduledDelayMillis = 1000; //ms
        this._exportTimeoutMillis = 5000; //ms

        this._buffer = [];
        this._timer = undefined;
        this._isExporting = false; //避免重複導出
    }

    _clearTimer() {
        if (this._timer !== undefined) {
            clearTimeout(this._timer);
            this._timer = undefined;
        }
    }

    _flushOneBatch() {
        this._clearTimer();
        //  buffer 裡沒有任務，直接返回 Promise結束
        if (this._buffer.length === 0) {
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                reject(new Error('Timeout'));
            }, this._exportTimeoutMillis);

            let taskItems;

            if (this._buffer.length <= this._maxExportBatchSize) {
                taskItems = this._buffer;
                this._buffer = [];
            } else {
                taskItems = this._buffer.splice(0, this._maxExportBatchSize);
            }

            this._exporter(taskItems, () => {
                clearTimeout(timer);
                resolve();
            });
        });
    }

    addToBuffer(taskItem) {
        // over queue size, drop task
        if (this._buffer.length == this._maxQueueSize) return;

        this._buffer.push(taskItem);

        this._maybeStartTimer();
    }

    _maybeStartTimer() {
        // 或者正在導出，則不重複啟動
        if (this._isExporting) return;
        const flush = () => {
            this._isExporting = true;
            this._flushOneBatch().finally(() => {
                this._isExporting = false;

                // 假如buffer裡面還有任務，再重新flush，以防止任務沒有被執行
                if (this._buffer.length > 0) {
                    this._clearTimer();
                    this._maybeStartTimer();
                }
            });
        };

        // 如果 buffer 內大於單次批次大小，立即flush---加速
        if (this._buffer.length >= this._maxExportBatchSize) {
            return flush();
        }
        if (this._timer !== undefined) return;

        // 允許延遲，讓更多任務進入 buffer；
        this._timer = setTimeout(() => flush(), this._scheduledDelayMillis);
    }
}

module.exports = {
    BatchProcessor,
};
