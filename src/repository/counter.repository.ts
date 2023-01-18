import TodayCounter, { ItodayCounter } from "../models/count";
import CommingCounter from "../models/commingCount";
import { dateDto } from "../interface/date.interface";

export class CounterRepository {
  async getHomeData() {
    return await TodayCounter.find({});
  }

  async getSoonData() {
    return await CommingCounter.find({});
  }

  async getDateData(params: dateDto) {
    const { date } = params;
    return await TodayCounter.findOne({ name: date });
  }

  async getCountList() {
    return await TodayCounter.find({});
  }
}
