import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Agendamento from '../models/Agendamento';
import AgendamentosRepositorio from '../repositories/AgendamentosRepositorio';
import AppError from '../errors/AppError';

interface Request {
    provider_id: string;
    date: Date;
}

class CriaAgendamentosServicos {
    public async execute({ date, provider_id }: Request): Promise<Agendamento> {
        const agendamentosRepositorio = getCustomRepository(AgendamentosRepositorio);

        const agendamentoData = startOfHour(date);

        const agendamentosMesmaHora = await agendamentosRepositorio.buscaData(
            agendamentoData,
        );

        if (agendamentosMesmaHora) {
            throw new AppError('Já existe um agendamento para esse horário!');
        }

        const agendamento = agendamentosRepositorio.create({
            provider_id,
            date: agendamentoData,
        });

        await agendamentosRepositorio.save(agendamento);

        return agendamento;
    }
}

export default CriaAgendamentosServicos;
