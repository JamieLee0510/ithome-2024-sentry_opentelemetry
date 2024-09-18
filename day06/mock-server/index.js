const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3090;

app.use(express.static(path.join(__dirname, 'dist')));
app.use(cors());

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
