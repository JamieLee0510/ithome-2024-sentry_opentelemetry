const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3030;

app.use(cors());

app.get('/', (req, res) => {
    res.send('hello server');
});

app.get('/api/demo', (req, res) => {
    console.log('req header from client side:', req.headers['traceparent']);
    res.json({ message: 'api success' });
});

app.listen(PORT, () => {
    console.log(`server running on: http://localhost:${PORT}`);
});
