import express from 'express';

const app = express();

app.get('/test', (req, res) => {
    res.send('Node Server Working!');
});

const port = 5050;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
