import * as SQLite from "expo-sqlite";

function openConnection() {
  const database = SQLite.openDatabase("database.db");
  return database;
}

export const db = openConnection();
