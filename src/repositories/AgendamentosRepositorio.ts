import { isEqual } from 'date-fns';
import Agendamento from '../models/Agendamento';

class AgendamentosRepositorio {
    private agendamentos: Agendamento[];

    constructor() {
        this.agendamentos = [];
    }

    public buscaData(date: Date): Agendamento | null {
        const buscaAgendamento = this.agendamentos.find(agendamento =>
            isEqual(date, agendamento.date),
        );

        return buscaAgendamento || null;
    }

    public create(provider: string, date: Date): Agendamento {
        const agendamento = new Agendamento(provider, date);

        this.agendamentos.push(agendamento);

        return agendamento;
    }
}

export default AgendamentosRepositorio;
