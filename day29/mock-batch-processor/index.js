const express = require('express');
const cors = require('cors');
const { BatchProcessor } = require('./batch-processor');
const { mockExporter } = require('./mock-exporter');

const app = express();
const PORT = 3060;

const batchProcessor = new BatchProcessor(mockExporter);

// 生成 100 到 500 毫秒的隨機延遲
const randomDelay = () => Math.floor(Math.random() * 400) + 100;

app.get('/', (req, res) => {
    res.send('hello mock batch-processor server');
});

app.get('/demo-batch', (req, res) => {
    const mockTasks = Array.from({ length: 30 }, (_, i) => `task ${i + 1}`);

    mockTasks.forEach((task, index) => {
        setTimeout(() => {
            console.log(`Pushing ${task} into the batch processor`);
            batchProcessor.addToBuffer(task);
        }, randomDelay() * index); // 隨機延遲推送任務到 processor
    });
});

app.listen(PORT, () => {
    console.log(`mock server is on http://localhost:${PORT}`);
});
