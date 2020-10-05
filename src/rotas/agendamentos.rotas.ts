import { Router } from 'express';
import bodyParser from 'body-parser';
import { startOfHour, parseISO } from 'date-fns';
import AgendamentosRepositorio from '../repositories/AgendamentosRepositorio';

const agendamentosRotas = Router();
const agendamentosRepositorio = new AgendamentosRepositorio();

const jsonPaeser = bodyParser.json();

agendamentosRotas.post('/', jsonPaeser, (request, response) => {
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));

    const agendamentosMesmoHorario = agendamentosRepositorio.buscaData(parsedDate);

    if (agendamentosMesmoHorario) {
        return response.status(400).json({ mensage: 'Já existe um agendamento para esse horário!'});
    }

    const agendamento = agendamentosRepositorio.create(provider, parsedDate);

    return response.json(agendamento);
});

export default agendamentosRotas;
