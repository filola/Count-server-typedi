import mongoose, { Schema, Document } from "mongoose";

export interface ItodayCounter extends Document {
  name: string;
  timeCount: number;
}

const commingCounter: Schema = new Schema({
  name: String,
  timeCount: Number,
});

// userId라는 이름으로 _id 사용
// todayCounter.virtual("").get(function () {
//   return this._id.toHexString();
// });
commingCounter.set("toJSON", {
  virtuals: true,
});
export default mongoose.model<ItodayCounter>("CommingCounter", commingCounter);
