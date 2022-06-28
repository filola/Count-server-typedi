import mongoose, { Schema, Document } from "mongoose";

export interface ItodayCounter extends Document {
  name: string;
  totalCount: number;
}

const todayCounter: Schema = new Schema({
  name: String,
  totalCount: Number,
});

// userId라는 이름으로 _id 사용
// todayCounter.virtual("").get(function () {
//   return this._id.toHexString();
// });
todayCounter.set("toJSON", {
  virtuals: true,
});
export default mongoose.model<ItodayCounter>("TodayCounter", todayCounter);
