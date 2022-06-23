import mysql from "mysql2/promise";

export const connection = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  port: 3306,
  password: "182436aa",
  database: "nissanTest",
  connectionLimit: 5,
  multipleStatements: true,
});

export const dbConnectionCheck = async (): Promise<void> => {
  const conn = await connection.getConnection();

  try {
    console.log("DB connection🦉");
  } catch (error: any) {
    throw new Error(error);
  } finally {
    conn.release();
  }
};
