import { Router } from 'express';
import agendamentosRotas from './agendamentos.rotas';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/agendamentos', agendamentosRotas);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
