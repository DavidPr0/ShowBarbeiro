import { Router } from 'express';
import bodyParser from 'body-parser';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

const jsonPaeser = bodyParser.json();

sessionsRouter.post('/', jsonPaeser, async (request, response) => {

    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
        email,
        password,
    });

    delete user.password;

    return response.json({ user, token });

});

export default sessionsRouter;
