import express from 'express';
import routes from './rotas';

const app = express();

app.use(routes);

// app.get('/' , (request, response) => {
//     return response.json({ mensage: 'Hello GoStar.' });
// });

app.listen(3333, () => {
    console.log('Server started on port 3333!')
});
