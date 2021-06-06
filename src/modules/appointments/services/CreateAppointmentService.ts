import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';
import Appointments from '../infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    date: Date;
}

class CreateAppointmentsService {
    constructor(private appointmentsRepository: IAppointmentsRepository) {}

    public async execute({ date, provider_id }: IRequest): Promise<Appointments> {

        const appointmentsData = startOfHour(date);

        const appointmentsEqualHour = await this.appointmentsRepository.searchData(
            appointmentsData,
        );

        if (appointmentsEqualHour) {
            throw new AppError('Já existe um agendamento para esse horário!');
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentsData,
        });

        return appointment;
    }
}

export default CreateAppointmentsService;
