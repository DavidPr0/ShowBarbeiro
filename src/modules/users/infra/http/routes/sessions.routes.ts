import { Router } from 'express';
import bodyParser from 'body-parser';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();
const jsonPaeser = bodyParser.json();

sessionsRouter.post('/', jsonPaeser, async (request, response) => {

    const { email, password } = request.body;

    const usersRepository = new UsersRepository();
    const authenticateUser = new AuthenticateUserService(usersRepository);

    const { user, token } = await authenticateUser.execute({
        email,
        password,
    });

    delete user.password;

    return response.json({ user, token });

});

export default sessionsRouter;
