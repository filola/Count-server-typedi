import { Db, MongoClient } from "mongodb";

import "dotenv/config";

export let db: Db;

MongoClient.connect(
  process.env.DB_URL as string,
  (error: Error | undefined, client: MongoClient | undefined) => {
    if (error) {
      return console.log(error);
    }

    db = (client as MongoClient).db("nissanDb");
    //서버시작
    console.log("DB Connect Success");
  },
);

export function Counter(module: string) {
  db.collection("Counter").updateOne({ name: module }, { $inc: { totalCount: 1 } }, () => {});
}
export function themeCounter(theme: string) {
  db.collection("Counter").updateOne(
    { name: "theme", "category.themeName": theme },
    { $inc: { "category.$.count": 1 } },
    () => {},
  );
}

export function todayCounter(date: string) {
  db.collection("todayCounter").updateOne(
    { name: date },
    { $inc: { totalCount: 1 } },
    { upsert: true },
    () => {},
  );
}
