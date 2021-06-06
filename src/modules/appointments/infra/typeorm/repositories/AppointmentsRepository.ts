import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointments from '../entities/Appointments';

class AppointmentsRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointments>;

    constructor() {
        this.ormRepository = getRepository(Appointments);
    }

    public async searchData(date: Date): Promise<Appointments | undefined> {
        const searchAppointments = await this.ormRepository.findOne({
            where: { date },
        });

        return searchAppointments;
    }

    public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointments> {
        const appointment = this.ormRepository.create({ provider_id, date });

        await this.ormRepository.save(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
