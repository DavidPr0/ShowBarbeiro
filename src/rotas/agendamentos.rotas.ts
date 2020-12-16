import 'reflect-metadata';
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import bodyParser from 'body-parser';
import { parseISO } from 'date-fns';

import AgendamentosRepositorio from '../repositories/AgendamentosRepositorio';
import CriarAgendamentoSevicos from '../services/CriaAgendamentosServicos';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const agendamentosRotas = Router();

const jsonPaeser = bodyParser.json();

agendamentosRotas.use(ensureAuthenticated);

agendamentosRotas.get('/', async (request, response) => {
    const agendamentosRepositorio = getCustomRepository(AgendamentosRepositorio);
    const agendamentos = await agendamentosRepositorio.find();

    return response.json(agendamentos);
});

agendamentosRotas.post('/', jsonPaeser, async (request, response) => {

    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const criarAgendamento = new CriarAgendamentoSevicos();

    const agendamento = await criarAgendamento.execute({
        date: parsedDate,
        provider_id,
    });

    return response.json(agendamento);

});

export default agendamentosRotas;
