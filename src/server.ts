import express from 'express';

const app = express();

app.get('/' , (request, response) => {
    return response.json({ mensage: 'Hello GoStar.' });
});

app.listen(3333, () => {
    console.log('Server started on port 333!')
});