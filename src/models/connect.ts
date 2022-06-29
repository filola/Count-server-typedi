import { Schema, model, connect } from "mongoose";

export async function run() {
  await connect(process.env.DB_URL as string);

  console.log("DB connect!");
}
