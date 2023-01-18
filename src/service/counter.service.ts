import { dateDto } from "../interface/date.interface";
import { CounterRepository } from "../repository/counter.repository";

export class CounterService {
  constructor(private _counterRepository: CounterRepository) {}

  home = async () => {
    return await this._counterRepository.getHomeData();
  };

  soon = async () => {
    return await this._counterRepository.getSoonData();
  };

  dateData = async (params: dateDto) => {
    return await this._counterRepository.getDateData(params);
  };

  list = async () => {
    return await this._counterRepository.getCountList();
  };
}
