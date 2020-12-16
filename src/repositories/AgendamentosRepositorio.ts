import { EntityRepository, Repository } from 'typeorm';

import Agendamento from '../models/Agendamento';

@EntityRepository(Agendamento)
class AgendamentosRepositorio extends Repository<Agendamento> {
    public async buscaData(date: Date): Promise<Agendamento | null> {
        const buscaAgendamento = await this.findOne({
            where: { date },
        });

        return buscaAgendamento || null;
    }
}

export default AgendamentosRepositorio;
