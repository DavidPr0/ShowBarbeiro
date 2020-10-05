import { Router } from 'express';
import agendamentosRotas from './agendamentos.rotas';

const routes = Router();

routes.use('/agendamentos', agendamentosRotas);

export default routes;
