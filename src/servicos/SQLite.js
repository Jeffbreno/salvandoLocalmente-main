import * as SQLite from "expo-sqlite";

function openConnection() {
  const database = SQLite.openDatabase("db.db");
  return database;
}

export const db = openConnection();
