import { uuid } from "uuidv4";

class Agendamento {
    id: string;

    providar: string;

    date: Date;

    constructor(provider: string, date: Date) {
        this.id = uuid();
        this.providar = provider;
        this.date = date;
    }
}

export default Agendamento;
