import { Schema, model, connect } from "mongoose";

export async function run() {
  await connect("mongodb://localhost:27017/nissanDb");

  console.log("DB connect!");
}
